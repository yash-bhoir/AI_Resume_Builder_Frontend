import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Bot, LogIn } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import UserFeedback from "./user-feedback";

export function Header() {
  const { user, isSignedIn } = useUser();

  // Call Register API after login and handle toast notifications
  const registerUser = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/users/register", {
        email: user?.primaryEmailAddress?.emailAddress,
        fullName: user?.fullName || `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
        clerk_id: user?.id,
        phoneNumber: user?.primaryPhoneNumber?.phoneNumber,
        username: user?.username || user?.id, // fallback to user.id if username is unavailable
      });

      // Show success toast
      toast.success(response.data.message || "User login successful");
    } catch (error: unknown) {
      // Show error toast
      if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object') {
        const response = error.response as { data?: { message?: string } };
        toast.error(response.data?.message || "Failed to register user");
        console.error("API Error:", response.data);
      } else {
        toast.error("Failed to register user");
        console.error("API Error:", error);
      }
    }
  };

  // Manage Cookies and API Call on Login
  useEffect(() => {
    if (isSignedIn && user) {
      // Set login cookie
      document.cookie = "login=true; path=/; max-age=86400; Secure; SameSite=Strict";
      console.log("Login cookie set.");

      // Call the register API
      registerUser();
    } else {
      // Clear login cookie
      document.cookie = "login=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict";
      console.log("Login cookie cleared.");
    }
  }, [user, isSignedIn]);

  return (
    <header className="border-b max-w-7xl w-full mx-auto h-16">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-black dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-all ease-in duration-300"> 
          <Bot className="w-6 h-6" />
          <span className="font-bold text-xl">ResumeAI</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {user && (
            <UserFeedback/>
          )}

          {/* Show Sign In button if signed out */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="default">
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          {/* Show User Button if signed in */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
