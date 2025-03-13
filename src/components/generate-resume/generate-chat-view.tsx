import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import ResumeSkeleton from "@/components/ResumeSkeleton";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PreviewSkeleton } from "@/components/PreviewSkeleton";
import { useTheme } from "next-themes";
import ResultPreview from "@/pages/resultPreview";
import { BiEditAlt } from "react-icons/bi";
import ColorTemplateOptions from "./color-template-options";
import { TbFileText } from "react-icons/tb";
import { TbBraces } from "react-icons/tb";
import { LuLayoutTemplate } from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

// Define message type
interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  isTyping?: boolean;
}
const GenerateChatView = (): JSX.Element => {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [typingText, setTypingText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>("none");
  const [fullResponseText, setFullResponseText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingText]);

  // Typing effect for AI responses
  useEffect(() => {
    if (isTyping && fullResponseText) {
      const textLength = fullResponseText.length;
      let i = 0;

      const typingInterval = setInterval(() => {
        if (i < textLength) {
          setTypingText(fullResponseText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);

          // Add the complete message to the chat
          setMessages((prev) => {
            const updatedMessages = [...prev];
            const typingMessageIndex = updatedMessages.findIndex(
              (m) => m.isTyping
            );

            if (typingMessageIndex !== -1) {
              updatedMessages[typingMessageIndex] = {
                ...updatedMessages[typingMessageIndex],
                content: fullResponseText,
                isTyping: false,
              };
            }

            return updatedMessages;
          });

          setTypingText("");
          setFullResponseText("");
        }
      }, 15); // Adjust speed of typing here

      return () => clearInterval(typingInterval);
    }
  }, [isTyping, fullResponseText]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isSignedIn) {
    navigate("/");
    return <></>;
  }
  if (isLoading) return <ResumeSkeleton />;

  const handleSendMessage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a message");
      return;
    }

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: prompt,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setIsGenerating(true);

    if (!showPreview) {
      setShowPreview(true);
    }

    try {
      // Add typing indicator message
      const typingMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "",
        role: "assistant",
        timestamp: new Date(),
        isTyping: true,
      };

      setMessages((prev) => [...prev, typingMessage]);
      setIsTyping(true);

      const response = await fetch(
        "http://localhost:8080/api/v1/openAi/createHtmlTemplate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userInput: userMessage.content,
            IsDark: isDarkMode,
            // If there are previous messages, include them for context
            previousMessages:
              messages.length > 0
                ? messages.map((m) => ({
                    role: m.role,
                    content: m.content,
                  }))
                : [],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate response");
      }

      const data = await response.json();

      // Set the full response text to trigger the typing effect
      setFullResponseText("I've updated your resume based on your feedback.");
      setGeneratedHtml(data.data.html);
    } catch (error) {
      toast.error("Failed to generate response");

      // Set error message with typing effect
      setFullResponseText(
        "Sorry, I encountered an error while generating your resume. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setGeneratedHtml(null);
    setTypingText("");
    setFullResponseText("");
    setIsTyping(false);
    toast.success("Chat cleared");
  };

  return (
    <div
      className={`flex gap-8 transition-all duration-500 ${
        !showPreview ? "ml-8" : "justify-center"
      }`}
    >
      {/* Left Side: Chat Interface */}
      <div
        className={`${
          !showPreview ? "w-1/2" : "w-full max-w-2xl"
        } space-y-6 transition-all duration-500 flex flex-col h-[80vh]`}
      >
        <div className="flex items-center group w-fit">
          <TbFileText className="text-neutral-600 dark:text-neutral-400 mr-1" />
          <h1 className="text-sm font-medium border-b text-neutral-800 dark:text-neutral-400">
            Software Engineer Resume
          </h1>
          <BiEditAlt className="size-4 cursor-pointer hidden group-hover:block ml-2" />
        </div>

        {messages.length == 0 && (
          <h1 className="w-full text-center text-3xl font-semibold">
            Let's Craft Your Perfect Resume!
          </h1>
        )}

        {/* Chat Messages */}
        {messages.length > 0 && (
          <div
            className="flex-1 overflow-y-auto border rounded-lg p-4 bg-background mb-4"
            ref={chatContainerRef}
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.isTyping ? (
                      <>
                        <p className="whitespace-pre-wrap">
                          {typingText}
                          <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1">
                            |
                          </span>
                        </p>
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="space-y-4">
          <div className="w-full flex flex-col items-start gap-2">
            <ColorTemplateOptions
              selectedColor={selectedColor}
              onChange={(color) => setSelectedColor(color)}
            />
            <div className="w-full max-h-[200px] border border-neutral-800 dark:border-neutral-400 rounded-xl flex flex-col items-start mt-3 pt-2">
              <Textarea
                placeholder="Type here to create or modify your resume..."
                className="h-[40px] text-md resize-none border-none shadow-none outline-none ring-0 focus:ring-0 focus:outline-none focus:border-none focus-within:ring-0 focus-within:border-none focus-visible:ring-0 focus-visible:border-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
              />

              <div className="w-full flex items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="m-2 h-9 w-9 p-0 rounded-full border-neutral-800 dark:border-neutral-400"
                        size="icon"
                        variant={"outline"}
                      >
                        <TbBraces className="size-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Basic Information preview</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="m-2 h-9 w-9 ml-0 p-0 rounded-full border-neutral-800 dark:border-neutral-400"
                        size="icon"
                        variant={"outline"}
                      >
                        <LuLayoutTemplate className="size-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add Template</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  onClick={handleSendMessage}
                  disabled={!prompt.trim() || isGenerating || isTyping}
                  className="ml-auto my-2 mr-2 h-9 w-9 p-0 rounded-full"
                  size="icon"
                >
                  {isGenerating ? (
                    <Sparkles className="size-5 animate-spin" />
                  ) : (
                    <Send className="size-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* <div className="flex items-center">
            <div className="ml-auto flex gap-2">
              <Button
                onClick={clearChat}
                variant="outline"
                size="sm"
                className="text-xs"
                disabled={isTyping}
              >
                <RefreshCw className="mr-1 h-3 w-3" />
                Clear Chat
              </Button>
            </div>
          </div> */}
        </div>
      </div>

      {/* Right Side: Preview */}
      {!showPreview && (
        <div className="w-1/2">
          <div className="sticky top-4">
            <h2 className="text-sm font-bold mb-2 text-neutral-600 dark:text-neutral-400">Resume Preview</h2>
            <div className="border rounded-lg p-4 bg-background h-[75vh] overflow-y-auto">
              {isGenerating || !generatedHtml ? (
                <PreviewSkeleton />
              ) : (
                <ResultPreview htmlCode={generatedHtml} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateChatView;
