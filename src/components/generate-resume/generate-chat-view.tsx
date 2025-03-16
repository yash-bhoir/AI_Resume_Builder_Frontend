import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import ResumeSkeleton from "@/components/common/skeleton-loading/resume-skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PreviewSkeleton } from "@/components/common/skeleton-loading/preview-skeleton";
import ResultPreview from "@/pages/resultPreview";
import { BiEditAlt } from "react-icons/bi";
import ColorTemplateOptions from "./color-template-options";
import { TbFileText } from "react-icons/tb";
import { MdOutlineColorLens } from "react-icons/md";
import { LuLayoutTemplate } from "react-icons/lu";
import { BiUpload } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import GenerateResumeFlow from "./generate-resume-flow";
import { OPEN_AI_ENDPOINTS, RESUME_ENDPOINTS } from "@/lib/endpoints";
import { PiSpinnerGapBold } from "react-icons/pi";
import { ASSISTANT_RESPONSES, GetRandomResponse } from "@/lib/utils";
import axios from "axios";

// TODO: Add the template to the chat
// TODO: Edit option of the basic information in the chat

const CACHE_EXPIRY = 10 * 60 * 1000;
interface Message {
  id: string;
  message: string;
  role: "user" | "assistant";
  timestamp: Date;
  isTyping?: boolean;
}
const GenerateChatView = (): JSX.Element => {
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>("none");
  const [isColorPaleteToggled, setIsColorPaleteToggled] =
    useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const formData = location.state?.formData;
  const resumeId = location.state?.resumeId;

  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      return;
    }

    loadConversationFromCache();

    if (!messages.length || isCacheStale()) {
      fetchConversation();
      fetchResumeData(resumeId);
    } else {
      setIsLoading(false);
    }
  }, [resumeId, isSignedIn]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isCacheStale = () => {
    const lastFetchedAt = localStorage.getItem(
      `resume_${resumeId}_lastFetchedAt`
    );
    if (!lastFetchedAt) return true;
    return Date.now() - Number(lastFetchedAt) > CACHE_EXPIRY;
  };

  const loadConversationFromCache = () => {
    const cachedMessages = localStorage.getItem(`resume_${resumeId}_messages`);
    if (cachedMessages) {
      setMessages(JSON.parse(cachedMessages));
    }
  };

  const fetchConversation = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${RESUME_ENDPOINTS.RESUME_GET_ALL_CONVERSATIONS}/${resumeId}`
      );

      if (response.data.success) {
        const formattedMessages = response.data.data.map(
          (msg: { timestamp: string | number | Date }) => ({
            ...msg,
            timestamp: new Date(msg.timestamp), // Convert to Date object
          })
        );

        setMessages(formattedMessages);
        updateCache(formattedMessages);
      }
    } catch (error) {
      console.error("Error fetching conversation:", error);
      toast.error("Failed to load conversation");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchResumeData = async (resumeId: string) => {
    if (!resumeId) return;
    setShowPreview(true);
    setIsGenerating(true);
    try {
      const response = await axios.get(
        `${RESUME_ENDPOINTS.RESUME_GET_BY_ID}/${resumeId}`
      );

      const data = response.data?.data;

      if (data) {
        setSelectedColor(data.colors);
        setGeneratedHtml(data.jsonHtmlCode || "");
      }
    } catch (error) {
      console.error("Failed to fetch resume data:", error);
      toast.error("Failed to load resume");
    } finally {
      setIsGenerating(false);
    }
  };

  const updateCache = (updatedMessages: Message[]) => {
    localStorage.setItem(
      `resume_${resumeId}_messages`,
      JSON.stringify(updatedMessages)
    );
    localStorage.setItem(
      `resume_${resumeId}_lastFetchedAt`,
      Date.now().toString()
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!userPrompt.trim()) {
      toast.error("Please enter a message");
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      message: userPrompt,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setUserPrompt("");
    setIsGenerating(true);

    try {
      const typingMessage: Message = {
        id: (Date.now() + 1).toString(),
        message: "",
        role: "assistant",
        timestamp: new Date(),
        isTyping: true,
      };

      setMessages((prev) => [...prev, typingMessage]);
      const assistantResponse = GetRandomResponse(ASSISTANT_RESPONSES);

      const response = await fetch(
        `${OPEN_AI_ENDPOINTS.PROMPT_TO_HTML_TEMPLATE_COMPLETIONS}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resumeId,
            userInput: newMessage.message,
            assistantResponse,
            color: selectedColor,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate response");
      }
      const data = await response.json();
      
      setTimeout(() => {
        setMessages((prev) => {
          const updatedMessages = [...prev];
          const typingMessageIndex = updatedMessages.findIndex(
            (msg) => msg.isTyping
          );
          if (typingMessageIndex !== -1) {
            updatedMessages[typingMessageIndex] = {
              ...updatedMessages[typingMessageIndex],
              message: data.data.response || assistantResponse,
              isTyping: false,
            };
          }
          return updatedMessages;
        });

        setGeneratedHtml(data.data);
        setShowPreview(true);
        setIsGenerating(false);
      }, 1000);
    } catch (error) {
      toast.error("Failed to generate response");
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

  if (isLoading) return <ResumeSkeleton />;

  return (
    <>
      <div
        className={`flex gap-8 mt-8 ${showPreview ? "ml-8 mr-8" : "justify-center"}`}
      >
        {/* Left Side: Chat Interface */}
        <div
          className={`${
            showPreview ? "w-1/2" : "w-full max-w-2xl"
          } flex flex-col h-[80vh]`}
        >
          <div className="flex items-center group w-3/4 mb-4">
            <Link
              to="/generate"
              className="text-sm hover:border-b border-b font-semibold capitalize cursor-pointer"
            >
              overview{" "}
            </Link>{" "}
            <span className="mx-2 text-neutral-700 dark:text-neutral-300">
              /
            </span>
            <div className="flex items-center group w-fit">
              <TbFileText className="text-neutral-600 dark:text-neutral-400 mr-1" />
              <h1 className="text-sm font-medium border-b capitalize text-neutral-800 dark:text-neutral-400">
                {formData?.resumeName || "Untitled Resume"}
              </h1>
              <BiEditAlt
                className="size-4 cursor-pointer ml-2"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>

          {messages.length == 0 && (
            <h1 className="w-full text-center text-3xl font-semibold mt-6 mb-3">
              Let's Craft Your Perfect Resume!✨
            </h1>
          )}

          {/* Chat Messages */}
          {messages.length > 0 && (
            <div
              className="flex-1 overflow-y-auto rounded-lg p-4 mb-4 main_content_sidebar border-2"
              ref={chatContainerRef}
            >
              <div className="space-y-3">
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
                          ? "dark:bg-indigo-500/70 bg-indigo-600 text-white"
                          : "bg-muted"
                      }`}
                    >
                      {message.isTyping ? (
                        <>
                          <p className="whitespace-pre-wrap">
                            <PiSpinnerGapBold className="animate-spin size-5" />
                          </p>
                          <div className="text-xs opacity-70 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="whitespace-pre-wrap">
                            {message.message}
                          </p>
                          <div className="text-xs opacity-70 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
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
              {(messages.length == 0 || isColorPaleteToggled) && (
                <ColorTemplateOptions
                  selectedColor={selectedColor}
                  onChange={(color) => setSelectedColor(color)}
                />
              )}
              <div className="w-full max-h-[200px] border border-neutral-800 dark:border-neutral-400 rounded-xl flex flex-col items-start mt-3 pt-2">
                <Textarea
                  placeholder="Type here to create or modify your resume..."
                  className="h-[40px] text-md resize-none border-none shadow-none outline-none ring-0 focus:ring-0 focus:outline-none focus:border-none focus-within:ring-0 focus-within:border-none focus-visible:ring-0 focus-visible:border-none"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                <div className="w-full flex items-center">
                  {messages.length > 0 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            className={`m-2 mr-0 h-9 w-9 p-0 border-2 rounded-full ${
                              isColorPaleteToggled
                                ? "border-indigo-700 dark:border-indigo-500"
                                : "border-neutral-800 dark:border-neutral-400"
                            }`}
                            size="icon"
                            variant={"outline"}
                            onClick={() =>
                              setIsColorPaleteToggled(!isColorPaleteToggled)
                            }
                          >
                            <MdOutlineColorLens className="size-5" />
                            {/* <TbBraces  /> */}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Color Scheme</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="m-2 h-9 w-9 p-0 rounded-full border-2 border-neutral-800 dark:border-neutral-400"
                          size="icon"
                          variant={"outline"}
                        >
                          <BiUpload className="size-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Upload an file</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="m-2 h-9 w-9 ml-0 p-0 rounded-full border-2 border-neutral-800 dark:border-neutral-400"
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
                    disabled={!userPrompt.trim() || isGenerating}
                    className="ml-auto my-2 mr-2 rounded-md"
                  >
                    {isGenerating ? "Generating..." : "Generate"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Preview */}
        {showPreview && (
          <div className="w-1/2">
            {isGenerating || !generatedHtml ? (
              <PreviewSkeleton />
            ) : (
              <ResultPreview htmlCode={generatedHtml} />
            )}
          </div>
        )}
      </div>
      <GenerateResumeFlow
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialFormData={formData}
        isUpdateResume={resumeId}
      />
    </>
  );
};

export default GenerateChatView;
