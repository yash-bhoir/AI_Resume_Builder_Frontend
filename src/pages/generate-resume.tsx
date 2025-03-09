import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, Send, Sparkles, Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import ResumeSkeleton from "@/components/ResumeSkeleton";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PreviewSkeleton } from "@/components/PreviewSkeleton";
import ResultPreview from "./resultPreview";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { useTheme } from "next-themes";

// Define message type
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

export function GenerateResumePage() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [fullResponseText, setFullResponseText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const {theme} = useTheme();
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
          setMessages(prev => {
            const updatedMessages = [...prev];
            const typingMessageIndex = updatedMessages.findIndex(m => m.isTyping);
            
            if (typingMessageIndex !== -1) {
              updatedMessages[typingMessageIndex] = {
                ...updatedMessages[typingMessageIndex],
                content: fullResponseText,
                isTyping: false
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

  const handleSendMessage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a message");
      return;
    }

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: prompt,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
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
        role: 'assistant',
        timestamp: new Date(),
        isTyping: true
      };
      
      setMessages(prev => [...prev, typingMessage]);
      setIsTyping(true);

      const response = await fetch("http://localhost:8080/api/v1/openAi/createHtmlTemplate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: userMessage.content,
          IsDark: isDarkMode,
          // If there are previous messages, include them for context
          previousMessages: messages.length > 0 ? messages.map(m => ({
            role: m.role,
            content: m.content
          })) : []
        }),
      });

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
      setFullResponseText("Sorry, I encountered an error while generating your resume. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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

  if (!isSignedIn) return null;
  if (isLoading) return <ResumeSkeleton />;

  return (
    <div className="container m-auto h-fit mt-8">
      <div className={`flex gap-8 transition-all duration-500 ${showPreview ? "" : "justify-center"}`}>
        {/* Left Side: Chat Interface */}
        <div className={`${showPreview ? "w-1/2" : "w-full max-w-2xl"} space-y-6 transition-all duration-500 flex flex-col h-[80vh]`}>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Bot className="h-8 w-8" />
              Resume AI Assistant
            </h1>
            <p className="text-muted-foreground">
              Chat with our AI to create and refine your perfect resume.
            </p>
          </div>

          {/* Chat Messages */}
          <div 
            className="flex-1 overflow-y-auto border rounded-lg p-4 bg-background mb-4"
            ref={chatContainerRef}
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <Bot className="h-12 w-12 mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Start Your Resume Journey</h3>
                <p className="text-muted-foreground max-w-md">
                  Describe your experience, skills, and career goals. I'll help you create a professional resume.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      {message.isTyping ? (
                        <>
                          <p className="whitespace-pre-wrap">{typingText}<span className="inline-block w-2 h-4 bg-current animate-pulse ml-1">|</span></p>
                          <div className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          <div className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="Ask me to create or modify your resume..."
                className="min-h-[100px] resize-none pr-12"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!prompt.trim() || isGenerating || isTyping}
                className="absolute bottom-3 right-3 h-8 w-8 p-0 rounded-full"
                size="icon"
              >
                {isGenerating ? (
                  <Sparkles className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="flex items-center">

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
                
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  disabled={isTyping}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Template
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Preview */}
        {showPreview && (
          <div className="w-1/2">
            <div className="sticky top-4">
              <h2 className="text-2xl font-bold mb-4">Resume Preview</h2>
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