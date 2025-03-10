import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  Code,
  Settings,
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
import { AiOutlineProduct } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { IoCodeSlash } from "react-icons/io5";
import { HiOutlineTemplate } from "react-icons/hi";
import { truncateText } from "@/lib/utils";


interface ResumeItem {
  id: number;
  title: string;
  date: string;
}

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
  history?: ResumeItem[];
  currentPage?: string;
  onAddResumeClick?: () => void;
  onAddTemplate?: () => void;
  onGoToGenerate?: () => void;
}

const demoHistory: ResumeItem[] = [
  { id: 1, title: "Frontend Developer Resume", date: "2024-03-20" },
  { id: 2, title: "Backend Engineer Resume", date: "2024-03-19" },
  { id: 3, title: "Product Manager CV", date: "2024-03-18" },
];

export function Sidebar({
  isCollapsed: initialCollapsed = false,
  onToggle,
  history = demoHistory,
  currentPage,
  onAddResumeClick,
  onAddTemplate,
  onGoToGenerate,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(initialCollapsed);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const { user: clerkUser } = useUser();

  const handleToggle = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setIsCollapsed(!isCollapsed);
      onToggle?.(!isCollapsed);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const timer = setTimeout(() => setIsLoading(false), 1000);
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

        <div className="flex flex-col h-full bg-white dark:bg-black">
          <div className="w-full h-full flex flex-col items-start">
            <div className="flex flex-col items-start mb-2 w-full">
              <div className="border-b py-2 px-6 w-full flex-1">
                <h2
                  className={`text-sm text-neutral-500 font-bold flex items-center gap-2 ${
                    isCollapsed || isMobile ? "justify-center" : ""
                  }`}
                >
                  {isCollapsed && !isMobile && (
                    <AiOutlineProduct className="h-6 w-6 text-neutral-500" />
                  )}
                  {!isCollapsed && !isMobile && "Products"}
                </h2>
              </div>

              <div className="flex-1 px-4 py-2 w-full">
                <div className="w-full h-8">
                  <Button
                    variant="ghost"
                    className={`w-full h-full justify-start text-left px-2 py-4 transition-all ease-in duration-150 ${
                      isCollapsed || isMobile ? "px-2" : ""
                    } ${currentPage === "generate" ? "bg-secondary dark:bg-primary-foreground text-indigo-500" : "hover:bg-secondary dark:hover:bg-primary-foreground bg-white dark:bg-black"}`}
                    onClick={onGoToGenerate}
                  >
                    <BsStars
                      className={`h-5 w-5 ${
                        !isCollapsed && !isMobile ? "mr-2" : ""
                      }`}
                    />
                    {!isCollapsed && !isMobile && (
                      <div className="flex flex-col items-start overflow-hidden">
                        <span className="text-sm font-medium truncate w-full">
                          Generate Resume
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
                <div className="w-full h-8 mt-2">
                  <Button
                    variant="ghost"
                    className={`w-full h-full justify-start text-left px-2 py-4 transition-all ease-in duration-150 ${
                      isCollapsed || isMobile ? "px-2" : ""
                    } ${currentPage === "codeEditor" ? "bg-secondary dark:bg-primary-foreground text-indigo-500" : "hover:bg-secondary dark:hover:bg-primary-foreground bg-white dark:bg-black"}`}
                    onClick={onAddResumeClick}
                  >
                    <IoCodeSlash
                      className={`h-5 w-5 ${
                        !isCollapsed && !isMobile ? "mr-2" : ""
                      }`}
                    />
                    {!isCollapsed && !isMobile && (
                      <div className="flex flex-col items-start overflow-hidden">
                        <span className="text-sm font-medium truncate w-full">
                          Code Editor
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
                <div className="w-full h-8 mt-2">
                  <Button
                    variant="ghost"
                    className={`w-full h-full justify-start text-left px-2 py-4 transition-all ease-in duration-150 ${
                      isCollapsed || isMobile ? "px-2" : ""
                    } ${currentPage === "AddTemplate" ? "bg-secondary dark:bg-primary-foreground text-indigo-500" : "hover:bg-secondary dark:hover:bg-primary-foreground bg-white dark:bg-black"}`}
                    onClick={onAddTemplate}
                  >
                    <HiOutlineTemplate
                      className={`h-5 w-5 ${
                        !isCollapsed && !isMobile ? "mr-2" : ""
                      }`}
                    />
                    {!isCollapsed && !isMobile && (
                      <div className="flex flex-col items-start overflow-hidden">
                        <span className="text-sm font-medium truncate w-full">
                          Template
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
                
              </div>
            </div>
            {/* <div>
              <div className="border-b py-2 px-6">
                <h2
                  className={`text-sm text-neutral-500 font-bold flex items-center gap-2 ${
                    isCollapsed || isMobile ? "justify-center" : ""
                  }`}
                >
                  {isCollapsed && !isMobile && (
                    <Clock className="h-5 w-5 text-neutral-500" />
                  )}
                  {!isCollapsed && !isMobile && "Recent History"}
                </h2>
              </div>

              <ScrollArea className="flex-1 px-4 py-2 mt-2">
                <div className="space-y-2">
                  {history.map((resume) => (
                    <TooltipProvider key={resume.id} delayDuration={10}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start text-left p-2 py-3 hover:bg-secondary dark:hover:bg-primary-foreground dark:bg-black bg-white transition-all ease-in duration-150 ${
                              isCollapsed || isMobile ? "px-2" : ""
                            }`}
                          >
                            <FileText
                              className={`h-5 w-5 ${
                                !isCollapsed && !isMobile && "mr-2"
                              }`}
                            />
                            {!isCollapsed && !isMobile && (
                              <div className="flex flex-col items-start overflow-hidden">
                                <span className="text-sm font-medium truncate w-full">
                                  {truncateText(resume.title, 20)}
                                </span>
                                <span className="text-xs text-neutral-700 dark:text-neutral-600">
                                  {new Date(resume.date).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                            {!isCollapsed && !isMobile && (
                              <div className="inline-block ml-auto">
                                <ChevronRight className="h-5 w-5" />
                              </div>
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center">
                          {resume.title}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </ScrollArea>
            </div> */}
          </div>

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
                {/* <DropdownMenuItem className="cursor-pointer"    onClick={onAddResumeClick} > 
                  <Code  className="mr-2 h-4 w-4" /> Try Code Editor
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer"    onClick={OnAddTemplate} > 
                  <FileText   className="mr-2 h-4 w-4" /> Add Resume Template
                </DropdownMenuItem> */}
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
