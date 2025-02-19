import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, FileText, Share2 } from "lucide-react"

export function ResumePreviewPage() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Your Generated Resume
          </h1>
          <div className="flex gap-3">
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        <Card className="p-8 bg-card">
          {/* Sample Resume Content */}
          <div className="space-y-6">
            <div className="text-center border-b pb-6">
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-muted-foreground">Senior Software Engineer</p>
              <p className="text-sm">john@example.com • (555) 123-4567 • San Francisco, CA</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Professional Summary</h3>
              <p className="text-muted-foreground">
                Experienced software engineer with 5+ years of expertise in full-stack development.
                Proven track record of leading teams and delivering high-impact projects for enterprise clients.
                Specialized in React, Node.js, and cloud architecture.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Experience</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <h4 className="font-medium">Senior Software Engineer</h4>
                    <span className="text-muted-foreground">2020 - Present</span>
                  </div>
                  <p className="text-muted-foreground">Tech Corp Inc.</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                    <li>Led development of microservices architecture</li>
                    <li>Managed team of 5 developers</li>
                    <li>Reduced system latency by 40%</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "TypeScript", "AWS", "Docker", "Kubernetes"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}