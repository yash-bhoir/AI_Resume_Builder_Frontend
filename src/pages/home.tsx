import { useUser, useClerk } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import KeyFeature from "@/components/common/keyfeature";
import UserFeedbackPreview from "@/components/common/user-feedback-preview";
import FAQPreview from "@/components/common/faq-preview";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const { isSignedIn } = useUser();
  const { redirectToSignIn } = useClerk();
  const navigate = useNavigate();

  const handleGenerateClick = () => {
    if (!isSignedIn) {
      toast.error("Please sign in to generate a resume.");
      redirectToSignIn();
    } else {
      navigate('/generate');
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="container h-full max-w-7xl w-full mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 relative z-20 font-bold tracking-tight leading-tight">
              Create Your Perfect <br /> Resume with AI.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Transform your career story into a compelling resume in seconds.
              <br />
              Powered by advanced AI to highlight your strengths and
              achievements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <InteractiveHoverButton onClick={handleGenerateClick}>
                Generate Resume
              </InteractiveHoverButton>
              <Button
                size="lg"
                variant="outline"
                className="bg-black text-white dark:bg-white dark:text-black rounded-full"
              >
                <FileText className="mr-2 h-5 w-5" /> View Examples
              </Button>
            </div>
          </div>
          <KeyFeature />
          <UserFeedbackPreview />
          <FAQPreview />
          <Footer onClick={handleGenerateClick} />
        </div>
      </main>
    </>
  );
}
