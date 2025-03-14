// Skeleton loader for Sidebar Component
import { Skeleton } from "@/components/ui/skeleton";

interface SidebarSkeletonProps {
  isCollapsed: boolean;
}

export function SidebarSkeleton({ isCollapsed }: SidebarSkeletonProps) {
  return (
    <div
      className={`border-r relative transition-all h-full ${
        isCollapsed ? "w-20" : "w-80"
      }`}
    >
      {/* Header Section */}
      <div className="p-4 border-b flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        {!isCollapsed && <Skeleton className="h-5 w-32" />}
      </div>

      {/* Menu Section */}
      <div className="flex-1 px-4 py-2 space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            {!isCollapsed && <Skeleton className="h-4 w-48 rounded" />}
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="border-t p-4 flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        {!isCollapsed && (
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        )}
      </div>
    </div>
  );
}
