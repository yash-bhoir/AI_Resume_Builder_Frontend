import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  useAuth as useClerkAuth,
  useUser as useClerkUser,
} from "@clerk/clerk-react";
import axios from "axios";
import { USER_ENDPOINTS } from "@/lib/endpoints";
import { toast } from "sonner";

interface AuthContextType {
  user: any;
  userId: string;
  loading: boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, signOut } = useClerkAuth();
  const { user, isLoaded } = useClerkUser();
  const [userId, setUserId] = useState<string>("");

  const logout = async () => {
    await signOut();
  };

  useEffect(() => {
    const register = async () => {
      if (user) {
        try {
          const response = await axios.post(`${USER_ENDPOINTS.USER_REGISTER}`, {
            email: user?.primaryEmailAddress?.emailAddress,
            fullName:
              user?.fullName ||
              `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
            clerk_id: user?.id,
            phoneNumber: user?.primaryPhoneNumber?.phoneNumber,
            avatarUrl: user?.imageUrl,
          });
          setUserId(response.data?.data?.id);

          toast.success("User registered successfully");
        } catch (error: any) {
          if (error?.response?.data?.message) {
            toast.error(error.response.data.message || "Failed to register user");
          } 
          console.error("Registration Error:", error);
        }
      }
    };

    if (isSignedIn) {
      register();
    }
  }, [user, isSignedIn]);

  const value = {
    user,
    userId,
    loading: !isLoaded,
    logout,
    isAuthenticated: isSignedIn ?? false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
