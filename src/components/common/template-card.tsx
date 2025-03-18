import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Code2, Star } from "lucide-react";
import { cn, truncateText } from "@/lib/utils";

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    html: string;
    timeStamp: string;
    type: string;
    stars?: number;
  };
  className?: string;
}

export function TemplateCard({ template, className }: TemplateCardProps) {
  return (
    <Card
      className={cn(
        "group w-[320px] transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      <div className="relative p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-md leading-tight line-clamp-2 pr-4 text-neutral-800 dark:text-neutral-400">
            {truncateText(template.name, 20)}
          </h3>
          <Badge
            variant="secondary"
            className="capitalize transition-colors bg-secondary/50 group-hover:bg-primary/10"
          >
            {template.type}
          </Badge>
        </div>

        {/* Preview Window */}
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border bg-background/50">
          <div className="absolute top-0 left-0 right-0 h-6 bg-muted/30 backdrop-blur-sm flex items-center px-3 gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
          </div>
          <iframe
            srcDoc={template.html}
            title={`${template.name} Preview`}
            className="w-full h-full border-none mt-6 overflow-hidden"
            sandbox="allow-same-origin"
            scrolling="no" // Disables scrolling
            style={{
              overflow: "hidden", // Ensures no overflow
              scrollbarWidth: "none", // Firefox-specific scrollbar hiding
              msOverflowStyle: "none", // IE and Edge-specific scrollbar hiding
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Footer */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <time className="text-xs font-semibold" dateTime={template.timeStamp}>{template.timeStamp}</time>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{template.stars || 0}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="group/button transition-colors"
              size="sm"
            >
              <Eye className="w-4 h-4 mr-2 transition-transform group-hover/button:scale-110" />
              Preview
            </Button>
            <Button
              variant="default"
              className="group/button transition-colors hover:bg-indigo-500 hover:text-white"
              size="sm"
            >
              <Code2 className="w-4 h-4 mr-2 transition-transform group-hover/button:scale-110" />
              Use
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
