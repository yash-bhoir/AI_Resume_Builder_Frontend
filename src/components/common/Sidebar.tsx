import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
  User
} from "lucide-react";
import { SidebarSkeleton } from "@/components/common/skeleton-loading/sidebar-skeleton";
import { useUser } from "@clerk/clerk-react";
import { useSidebarContext } from "@/context/SidebarContext";
import { useLocation, useNavigate } from "react-router-dom";

import { BsStars } from "react-icons/bs";
import { IoCodeSlash } from "react-icons/io5";
import { HiOutlineTemplate } from "react-icons/hi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

const sidebarItems = [
  {
    label: "Overview",
    icon: BsStars,
    path: "/generate",
  },
  {
    label: "Code Editor",
    icon: IoCodeSlash,
    path: "/generate/code-editor",
  },
  {
    label: "Template",
    icon: HiOutlineTemplate,
    path: "/generate/add-template",
  },
];

export function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebarContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user: clerkUser } = useUser();

  const location = useLocation();
  const currentPage = location.pathname;
  const navigate = useNavigate();

  const handleToggle = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      toggleSidebar();
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("resize", handleResize);
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) return <SidebarSkeleton isCollapsed={isCollapsed} />;

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 rounded-full shadow-md bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleToggle}
        >
          {mobileSidebarOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </Button>
      )}

      <div
        className={`border-r bg-card relative transition-all duration-300 ease-in-out h-full ${
          isMobile
            ? mobileSidebarOpen
              ? "w-80 z-40 fixed top-0 left-0"
              : "w-0 overflow-hidden"
            : isCollapsed
            ? "w-20"
            : "w-64"
        } ${isMobile ? "shadow-lg" : ""}`}
      >
        {/* Sidebar Content */}
        <div className="flex flex-col h-full bg-white dark:bg-black relative">
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute hidden z-10 top-4 -right-4 h-8 w-8 border-2 border-[#535bf2] shadow-md bg-[#535bf2] hover:bg-[#484fe0] md:flex"
              onClick={handleToggle}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-white" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-white" />
              )}
            </Button>
          )}
          <div className="w-full h-full flex flex-col items-start">
            <div className="flex-1 px-4 py-2 w-full">
              {sidebarItems.map((item) => {
                const isActive = currentPage === item.path;
                const Icon = item.icon;

                return (
                  <div key={item.path} className="w-full h-8 mt-2">
                    <Button
                      variant="ghost"
                      className={`w-full h-full justify-start text-left px-2 py-4 transition-all ease-in duration-150 ${
                        isCollapsed || isMobile ? "px-2" : ""
                      } ${
                        isActive
                          ? "bg-secondary dark:bg-primary-foreground text-indigo-500 hover:bg-secondary dark:hover:bg-primary-foreground hover:text-indigo-500"
                          : "hover:bg-secondary dark:hover:bg-primary-foreground bg-white dark:bg-black"
                      }`}
                      onClick={() => navigate(item.path)}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          !isCollapsed && !isMobile ? "mr-2" : ""
                        }`}
                      />
                      {!isCollapsed && !isMobile && (
                        <div className="flex flex-col items-start overflow-hidden">
                          <span className="text-sm font-medium truncate w-full">
                            {item.label}
                          </span>
                        </div>
                      )}
                      {!isCollapsed && !isMobile && (
                        <div className="inline-block ml-auto">
                          <ChevronRight className="h-5 w-5" />
                        </div>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* User Profile Dropdown */}
          <div className="border-t bg-card mt-auto py-3 dark:bg-black bg-white">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 hover:bg-accent/50 dark:hover:bg-primary-foreground/50 dark:bg-black bg-white"
                >
                  {clerkUser?.imageUrl ? (
                    <img
                      src={clerkUser.imageUrl}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full ring-2 ring-background"
                    />
                  ) : (
                    <User className="w-8 h-8 text-muted-foreground" />
                  )}
                  {!isCollapsed && !isMobile && (
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">
                        {clerkUser?.fullName || "John Doe"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {clerkUser?.primaryEmailAddress?.emailAddress ||
                          "john.doe@example.com"}
                      </span>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
}
