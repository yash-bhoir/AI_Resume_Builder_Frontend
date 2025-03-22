import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Sparkles, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdArrowDropdown } from "react-icons/io";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Prop {
  htmlCode: string;
}

// TODO: download as pdf [text format not image]

function ResultPreview({ htmlCode }: Prop) {
  const [editedContent, setEditedContent] = useState<string>(htmlCode);
  const [aiButtonPosition, setAiButtonPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [selectedText, setSelectedText] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const previewRef = useRef<HTMLDivElement>(null);
  const previewSectionRef = useRef<HTMLDivElement>(null);
  const [downloadableAs, setDownloadbaleAs] = useState<string>("html");
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = htmlCode;
      setEditedContent(htmlCode);
    }
  }, [htmlCode]);

  const handlePreviewEdit = () => {
    if (previewRef.current) {
      const newContent = previewRef.current.innerHTML;
      setEditedContent(newContent);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (
      selection &&
      selection.rangeCount > 0 &&
      selection.toString().trim() !== ""
    ) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const previewRect = previewSectionRef.current?.getBoundingClientRect();

      if (previewRect) {
        // Calculate the position relative to the preview section
        const top = rect.top - previewRect.top + window.scrollY - 70; // 70px above the selected text
        const left = rect.left - previewRect.left + window.scrollX;

        // Ensure the prompt box stays within the preview section
        const maxTop = previewRect.height - 100; // Adjust for prompt box height
        const maxLeft = previewRect.width - 200; // Adjust for prompt box width

        const adjustedTop = Math.max(0, Math.min(top, maxTop)); // Ensure it doesn't go above or below
        const adjustedLeft = Math.max(0, Math.min(left, maxLeft)); // Ensure it doesn't go outside left or right

        const selectedText = selection.toString(); // Capture selected text
        setSelectedText(selectedText);
        setAiButtonPosition({
          top: adjustedTop,
          left: adjustedLeft,
        });

        // Log the selected text to the console
        console.log("Selected Text:", selectedText);
      }
    } else {
      setAiButtonPosition(null);
      setSelectedText("");
      setPrompt(""); // Clear prompt when selection is cleared
    }
  };

  const generateWithAI = async () => {
    if (selectedText) {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: selectedText, prompt: prompt }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const aiText = data.generatedText; // Assuming your API returns { generatedText: "..." }

        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          const aiTextNode = document.createTextNode(aiText);
          range.insertNode(aiTextNode);
          handlePreviewEdit();
          setAiButtonPosition(null);
          setSelectedText("");
          setPrompt("");

          if (previewSectionRef.current) {
            previewSectionRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      } catch (error) {
        console.error("Error generating with AI:", error);
        alert("Error generating with AI. Please try again later.");
      }
    }
  };

  const handleDownload = async () => {
    if (downloadableAs === "html") {
      // Download as HTML
      const blob = new Blob([editedContent], { type: "text/html" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${user.fullName}.html`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (downloadableAs === "pdf") {
      if (previewRef.current) {
        const canvas = await html2canvas(previewRef.current, {
          scale: 2, // Higher scale for better quality
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`${user.fullName}.pdf`);
      }
    }
  };
  return (
    <>
      {/* Preview Section */}
      <div ref={previewSectionRef} className="" onMouseUp={handleTextSelection}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-neutral-600 dark:text-neutral-400">
              Resume Preview
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant={"outline"}
              className="flex items-center gap-2"
              onClick={handleView}
            >
              <Eye className="w-4 h-4" />
              View
            </Button>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download as {downloadableAs.toUpperCase()}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size={"icon"} className="px-0">
                    <IoMdArrowDropdown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Download as</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={downloadableAs}
                    onValueChange={setDownloadbaleAs}
                  >
                    <DropdownMenuRadioItem value="html">
                      HTML
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="pdf">
                      PDF
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className="p-4 h-[75vh] overflow-auto border rounded-lg shadow-lg main_content_sidebar">
          <div
            ref={previewRef}
            className="min-h-[400px] bg-white"
            contentEditable
            onInput={handlePreviewEdit}
            suppressContentEditableWarning
          />
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl h-[90vh]">
          <DialogHeader>
            <DialogTitle>Preview Resume</DialogTitle>
          </DialogHeader>
          <div className="h-[80vh]">
            <iframe
              srcDoc={editedContent}
              title="Resume Preview"
              className="w-full h-full border rounded-md"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Generate Button and Prompt Input */}
      {aiButtonPosition && (
        <div
          style={{
            position: "absolute",
            top: aiButtonPosition.top,
            left: aiButtonPosition.left,
            zIndex: 50,
            backgroundColor: "white",
            padding: "8px",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt"
            className="border rounded p-2 mb-2 w-full"
            rows={3}
          />
          <Button
            variant="default"
            size="sm"
            onClick={generateWithAI}
            className="flex items-center gap-2 shadow-lg w-full"
          >
            <Sparkles className="w-4 h-4" />
            Generate with AI
          </Button>
        </div>
      )}
    </>
  );
}

export default ResultPreview;
