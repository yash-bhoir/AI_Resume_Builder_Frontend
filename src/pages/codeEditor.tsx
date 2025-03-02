import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Code2, Eye, RefreshCcw, Sparkles } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function CodeEditor( {onGoToGenerate }) {
  const [code, setCode] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>('');
  const [aiButtonPosition, setAiButtonPosition] = useState<{ top: number; left: number } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = code;
      setEditedContent(code);
    }
  }, [code]);

  const handlePreviewEdit = () => {
    if (previewRef.current) {
      const newContent = previewRef.current.innerHTML;
      setEditedContent(newContent);
    }
  };

  const syncToEditor = () => {
    setCode(editedContent);
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && selection.toString().trim() !== "") {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setAiButtonPosition({
        top: rect.top + window.scrollY - 40,
        left: rect.left + window.scrollX,
      });
    } else {
      setAiButtonPosition(null);
    }
  };

  const generateWithAI = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const aiText = document.createTextNode("✨ AI Generated Content ✨");
      range.insertNode(aiText);
      handlePreviewEdit();
      setAiButtonPosition(null);
    }
  };

  const goToGenerate = () => {
    navigate('/generate');
  };

  return (
    <div className="min-h-screen bg-background p-6 relative" onMouseUp={handleTextSelection}>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Code Preview Editor</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={syncToEditor}
              className="flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              Sync to Editor
            </Button>
            <Button variant="outline" onClick={onGoToGenerate}>
              Go to Generate
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <div className="p-4 border-b flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span className="font-medium">Code</span>
            </div>
            <CardContent className="p-4">
              <Textarea
                placeholder="Enter your HTML and CSS code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[400px] font-mono"
              />
            </CardContent>
          </Card>

          <Card className="col-span-1 relative">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span className="font-medium">Preview (Editable)</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Click "Sync to Editor" to update code
              </span>
            </div>
            <CardContent className="p-4">
              <div
                ref={previewRef}
                className="border rounded-lg p-4 min-h-[400px] bg-white"
                contentEditable
                onInput={handlePreviewEdit}
                suppressContentEditableWarning
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {aiButtonPosition && (
        <Button
          variant="default"
          size="sm"
          style={{
            position: 'absolute',
            top: aiButtonPosition.top,
            left: aiButtonPosition.left,
            zIndex: 50,
          }}
          onClick={generateWithAI}
          className="flex items-center gap-2 shadow-lg"
        >
          <Sparkles className="w-4 h-4" />
          Generate with AI
        </Button>
      )}
    </div>
  );
}

export default CodeEditor;