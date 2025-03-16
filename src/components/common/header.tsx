import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Bot, LogIn } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import UserFeedback from "./user-feedback";

export function Header() {
  const { user } = useUser();
  return (
    <header className="border-b max-w-8xl w-full m-auto h-16">
      <div className="container mx-auto px-16 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-black dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-all ease-in duration-300"
        >
          <Bot className="w-6 h-6" />
          <span className="font-bold text-xl">ResumeAI</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {user && <UserFeedback />}

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
