import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, Sparkles, Plus } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import ResumeSkeleton from "@/components/ResumeSkeleton";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import ResultPreview from "./resultPreview";
import { PreviewSkeleton } from "@/components/PreviewSkeleton";

export function GenerateResumePage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false); // New state to control preview visibility

  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter your career details");
      return;
    }

    setIsGenerating(true);
    setShowPreview(true); // Show preview section when generating starts

    try {
      const response = await fetch("http://localhost:8080/api/v1/openAi/createHtmlTemplate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: prompt,
          IsDark: isDarkMode,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate resume");
      }

      const data = await response.json();
      setGeneratedHtml(data.data.html);
    } catch (error) {
      toast.error("Failed to generate resume");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isSignedIn) return null;
  if (isLoading) return <ResumeSkeleton />;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className={`flex gap-8 transition-all duration-500 ${showPreview ? "" : "justify-center"}`}>
        {/* Left Side: Prompt Input */}
        <div className={`${showPreview ? "w-1/2" : "w-full max-w-2xl"} space-y-6 transition-all duration-500`}>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Bot className="h-8 w-8" />
              Generate Your Resume
            </h1>
            <p className="text-muted-foreground">
              Describe your experience and career goals, and our AI will create a
              tailored resume for you.
            </p>
          </div>

          <div className="space-y-4">
            <Textarea
              placeholder="Example: I'm a software engineer with 5 years of experience in full-stack development..."
              className="min-h-[300px] resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="dark-mode">Use Dark Theme</Label>
                <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              </div>

              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Template
              </Button>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Pro Tips:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Include your years of experience</li>
                <li>Mention key achievements and skills</li>
                <li>Specify your target role or industry</li>
                <li>Highlight leadership experience if applicable</li>
                <li>Include relevant certifications or education</li>
              </ul>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                  Generating Your Resume...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Generate Resume
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Right Side: Preview */}
        {showPreview && (
          <div className="w-1/2">
            <div className="sticky top-4">
              <h2 className="text-2xl font-bold mb-4">Resume Preview</h2>
              <div className="border rounded-lg p-4 bg-background">
                {isGenerating || !generatedHtml ? (
                  <PreviewSkeleton /> // Show skeleton while generating or until resume is fetched
                ) : (
                  <ResultPreview htmlCode={generatedHtml} /> // Show generated resume
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Template Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Template Details</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Paste your template HTML or JSON here..."
            className="min-h-[200px] resize-none mb-4"
          />
          <div className="flex justify-end">
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="destructive"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsModalOpen(false);
                toast.success("Template added successfully!");
              }}
              className="ml-2"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}