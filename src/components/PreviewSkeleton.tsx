// components/PreviewSkeleton.tsx
export function PreviewSkeleton() {
    return (
      <div className="space-y-4">
        <div className="animate-pulse bg-muted/50 h-8 w-1/2 rounded" />
        <div className="animate-pulse bg-muted/50 h-4 w-3/4 rounded" />
        <div className="animate-pulse bg-muted/50 h-4 w-2/3 rounded" />
        <div className="animate-pulse bg-muted/50 h-4 w-1/2 rounded" />
        <div className="animate-pulse bg-muted/50 h-4 w-3/4 rounded" />
        <div className="animate-pulse bg-muted/50 h-4 w-2/3 rounded" />
      </div>
    );
  }