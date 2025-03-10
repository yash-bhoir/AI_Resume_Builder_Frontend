import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { Bot, Github, Linkedin, Twitter } from "lucide-react";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { DotPattern } from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";

interface FooterProps {
  onClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onClick }) => {
  return (
    <div className="flex flex-col items-start mt-20 gap-8">
      <div className="p-6 w-full flex flex-col items-center justify-center border max-w-5xl rounded-2xl mx-auto relative overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
          )}
        />

        <span className="text-neutral-50 text-center p-3 rounded-full bg-indigo-600">
          <Bot className="size-10" />
        </span>
        <h1 className="text-3xl font-semibold">Resume AI</h1>
        <p className="max-w-[400px] text-neutral-500 dark:text-neutral-400 text-center mt-2 mb-4 text-pretty">
          Let AI craft a professional, ATS-friendly resume that helps you land
          your dream job. Fast, easy, and optimized for success!
        </p>
        <InteractiveHoverButton onClick={onClick}>
          Generate Resume
        </InteractiveHoverButton>
      </div>
      <div className="p-6 border-t w-full flex items-center justify-between">
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          © {new Date().getFullYear()} ResumeAI. All rights reserved.
        </span>
        <div className="flex flex-row items-start gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-700 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all ease-in duration-300"
          >
            <Twitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-700 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all ease-in duration-300"
          >
            <Linkedin />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-700 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all ease-in duration-300"
          >
            <Github />
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-700 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all ease-in duration-300"
          >
            <DiscordLogoIcon className="size-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
