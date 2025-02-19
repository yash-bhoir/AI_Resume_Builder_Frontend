import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarSkeleton } from "@/components/SidebarSkeleton";
import { useUser } from "@clerk/clerk-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const demoHistory = [
  { id: 1, title: "Frontend Developer Resume", date: "2024-03-20" },
  { id: 2, title: "Backend Engineer Resume", date: "2024-03-19" },
  { id: 3, title: "Product Manager CV", date: "2024-03-18" },
];

export function Sidebar({
  isCollapsed: initialCollapsed,
  onToggle,
  history = demoHistory,
}) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user: clerkUser } = useUser();

  const handleToggle = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setIsCollapsed(!isCollapsed);
      if (onToggle) onToggle(!isCollapsed);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <SidebarSkeleton isCollapsed={isCollapsed} />;
  }

  return (
    <>
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 rounded-full shadow-md bg-blue-600 text-white hover:bg-blue-700"
          style={{ top: "1rem" }}
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
            : "w-80"
        } ${isMobile ? "shadow-lg" : ""}`}
      >
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 -right-4 h-8 w-8 border-2 border-[#535bf2] shadow-md bg-[#535bf2] hover:bg-[#484fe0] hidden md:flex"
            onClick={handleToggle}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-white" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-white" />
            )}
          </Button>
        )}

        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2
              className={`text-lg font-semibold flex items-center gap-2 ${
                isCollapsed || isMobile ? "justify-center" : ""
              }`}
            >
              <Clock className="h-5 w-5 text-primary" />
              {!isCollapsed && !isMobile && "Resume History"}
            </h2>
          </div>

          <ScrollArea className="flex-1 px-4 py-2">
            <div className="space-y-2">
              {history.map((resume) => (
                <TooltipProvider key={resume.id} delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start text-left transition-colors ${
                          isCollapsed || isMobile ? "px-2" : ""
                        } hover:bg-accent/50`}
                      >
                        <FileText
                          className={`h-4 w-4 ${
                            !isCollapsed && !isMobile && "mr-2"
                          }`}
                        />
                        {!isCollapsed && !isMobile && (
                          <div className="flex flex-col items-start overflow-hidden">
                            <span className="text-sm font-medium truncate w-full">
                              {resume.title}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(resume.date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </Button>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right" align="center">
                        {resume.title}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </ScrollArea>

          <div
            className="border-t bg-card  mt-auto"
            style={{ marginBottom: "1rem" }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 hover:bg-accent/50"
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
