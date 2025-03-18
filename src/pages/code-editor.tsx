import { Button } from "@/components/ui/button";
import { IoCodeSlash } from "react-icons/io5";
// import { FaSyncAlt } from "react-icons/fa";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Code2, Eye } from "lucide-react";
import { FaCss3Alt } from "react-icons/fa";

import Editor from "@monaco-editor/react";
import CodeEditorSkeleton from "@/components/common/skeleton-loading/code-editor-skeleton";

const defaultHtml = `<div class="intro-resume-ai">
  <h1>Welcome to Resume AI</h1>
  <p>Create professional resumes effortlessly with AI-powered assistance. Start customizing your resume now!</p>
</div>`;

const defaultCss = `.intro-resume-ai {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 12px;
  color: #ffffff;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

p {
  font-size: 1.2rem;
  opacity: 0.9;
}`;

const CodeEditor = () => {
  const [htmlCode, setHtmlCode] = useState(defaultHtml);
  const [cssCode, setCssCode] = useState(defaultCss);
  const [activeTab, setActiveTab] = useState<"html" | "css">("html");
  const [preview, setPreview] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const combinedCode = `
    <style>${cssCode}</style>
    ${htmlCode}
    `;
    setPreview(combinedCode);
  }, [htmlCode, cssCode]);

  if (isLoading) return <CodeEditorSkeleton />;
  return (
    <>
      <div className="container mt-2 w-full flex flex-col items-start">
        <div className="m-auto h-fit flex items-start justify-between w-full pl-10 pr-20 py-2">
          <h1 className="text-lg font-medium flex items-center text-neutral-600 dark:text-neutral-300">
            <IoCodeSlash className="size-5 mr-2" />
            Code Editor{" "}
          </h1>

          {/* <div>
            <span className="text-xs mr-3 text-neutral-500 dark:text-neutral-400 font-medium italic">
              ** Click the 'Sync Progress' button to apply and reflect your
              updates.
            </span>
            <Button variant={"outline"} className="group">
              <FaSyncAlt className="size-3 mr-2 group-hover:scale-110 text-neutral-500 dark:text-neutral-400" />
              Sync Progress
            </Button>
          </div> */}
        </div>

        <div className="mt-2 h-[80vh] w-full px-8">
          <div className="container pb-8 mx-auto h-[calc(92vh-5rem)]">
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Editor Section */}
              <div className="rounded-lg overflow-hidden">
                <div className="w-full flex items-center">
                  <button
                    className={`px-4 rounded-t-lg py-2 text-sm flex items-center gap-2 ${
                      activeTab === "html"
                        ? "bg-indigo-700 text-white"
                        : "dark:text-neutral-400 text-neutral-800 dark:hover:text-white hover:text-neutral-700"
                    }`}
                    onClick={() => setActiveTab("html")}
                  >
                    <Code2 className="w-4 h-4" />
                    HTML
                  </button>
                  <button
                    className={`px-4 rounded-t-lg py-2 text-sm flex items-center gap-2 ${
                      activeTab === "css"
                        ? "bg-indigo-700 text-white"
                        : "dark:text-neutral-400 text-neutral-800 dark:hover:text-white hover:text-neutral-700"
                    }`}
                    onClick={() => setActiveTab("css")}
                  >
                    <FaCss3Alt className="w-4 h-4" />
                    CSS
                  </button>

                  <Button
                    className="ml-auto mb-1"
                    variant="outline"
                    size="icon"
                    onClick={toggleTheme}
                  >
                    {isDarkMode ? (
                      <Sun className="size-4" />
                    ) : (
                      <Moon className="size-4" />
                    )}
                  </Button>
                </div>
                <div className="h-[calc(100%-2.5rem)]">
                  {activeTab === "html" ? (
                    <Editor
                      height="100%"
                      defaultLanguage="html"
                      theme={isDarkMode ? "vs-dark" : "#ffffff"}
                      value={htmlCode}
                      onChange={(value) => setHtmlCode(value || "")}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        padding: { top: 16 },
                        wordWrap: "on",
                      }}
                    />
                  ) : (
                    <Editor
                      height="100%"
                      defaultLanguage="css"
                      theme={isDarkMode ? "vs-dark" : "#ffffff"}
                      value={cssCode}
                      onChange={(value) => setCssCode(value || "")}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        padding: { top: 16 },
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Preview Section */}
              <div className="rounded-lg overflow-hidden">
                <div className="flex items-center justify-between border-b px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </div>
                </div>
                <div className="h-[calc(100%-2.5rem)] bg-white dark:bg-black">
                  {preview ? (
                    <iframe
                      title="preview"
                      srcDoc={preview}
                      className="w-full h-full border-none"
                      sandbox="allow-scripts"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
