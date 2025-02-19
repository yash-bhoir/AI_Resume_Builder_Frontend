import { Link } from "react-router-dom"
import { useUser, useClerk } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
import { Bot, FileText, Sparkles } from "lucide-react"
import { toast } from "sonner"

export function HomePage() {
  const { isSignedIn } = useUser()
  const { redirectToSignIn } = useClerk()

  const handleGenerateClick = () => {
    if (!isSignedIn) {
      toast.error("Please sign in to generate a resume.")
      redirectToSignIn()
    } else {
      window.location.href = "/generate"
    }
  }

  return (
    <main>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Create Your Perfect Resume with AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Transform your career story into a compelling resume in seconds. Powered by advanced AI to highlight your strengths and achievements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={handleGenerateClick}
            >
              <Sparkles className="mr-2 h-5 w-5" /> Generate Resume
            </Button>
            <Button size="lg" variant="outline">
              <FileText className="mr-2 h-5 w-5" /> View Examples
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            {
              icon: <Sparkles className="h-10 w-10 mb-4" />,
              title: "AI-Powered Writing",
              description:
                "Our AI understands your experience and crafts compelling content that stands out.",
            },
            {
              icon: <FileText className="h-10 w-10 mb-4" />,
              title: "ATS-Friendly Templates",
              description:
                "Professionally designed templates optimized for Applicant Tracking Systems.",
            },
            {
              icon: <Bot className="h-10 w-10 mb-4" />,
              title: "Smart Formatting",
              description:
                "Automatic formatting and layout adjustments to create the perfect presentation.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border bg-card hover:bg-card/80 transition-colors"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
