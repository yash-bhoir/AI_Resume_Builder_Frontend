import { Skeleton } from "@/components/ui/skeleton";

export default function ResumeSkeleton() {
  return (
    <div className="container max-w-3xl mx-auto px-4 mt-8 space-y-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-48 rounded" />
        </div>
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Textarea Placeholder */}
      <Skeleton className="h-64 w-full rounded" />

      {/* Button Placeholder */}
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  );
}
