// Skeleton loader for Sidebar Component
import { Skeleton } from "@/components/ui/skeleton";

export function SidebarSkeleton({ isCollapsed }) {
  return (
    <div className={`border-r bg-card relative transition-all h-full ${isCollapsed ? "w-20" : "w-80"}`}>
      <div className="p-4 border-b flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        {!isCollapsed && <Skeleton className="h-5 w-32" />}
      </div>

      <div className="flex-1 px-4 py-2 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            {!isCollapsed && <Skeleton className="h-4 w-48 rounded" />}
          </div>
        ))}
      </div>

      <div className="border-t bg-card p-4 flex items-center gap-2">
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
