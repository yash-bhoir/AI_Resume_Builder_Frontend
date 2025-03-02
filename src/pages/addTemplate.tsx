import { useState } from 'react';
import { PlusCircle, FileCode, FileImage, FileText, LayoutTemplate, Pencil, X, Sparkles, Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Separator } from "@/components/ui/separator";

interface Template {
  id: string;
  name: string;
  html: string;
  type: 'system' | 'custom';
}

const systemTemplates: Template[] = [
  {
    id: '1',
    name: 'Modern Professional',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h1 style="color: #2563eb; font-size: 24px;">John Doe</h1>
        <p style="color: #666;">Senior Software Engineer</p>
        <div style="margin: 20px 0; height: 2px; background: #e5e7eb;"></div>
        <h2 style="color: #2563eb; font-size: 18px;">Experience</h2>
        <div style="margin: 10px 0;">
          <h3 style="font-size: 16px;">Tech Corp - Senior Developer</h3>
          <p style="color: #666;">2020 - Present</p>
        </div>
      </div>
    `,
    type: 'system'
  },
  {
    id: '2',
    name: 'Creative Designer',
    html: `
      <div style="font-family: 'Helvetica', sans-serif; padding: 20px; background: #f8f9fa;">
        <div style="text-align: center;">
          <h1 style="color: #6366f1; font-size: 28px; margin: 0;">Sarah Smith</h1>
          <p style="color: #4b5563; margin-top: 5px;">UI/UX Designer</p>
        </div>
        <div style="margin: 20px 0; height: 3px; background: linear-gradient(to right, #6366f1, #8b5cf6);"></div>
        <div style="margin-top: 20px;">
          <h2 style="color: #6366f1; font-size: 20px;">Portfolio Highlights</h2>
          <ul style="list-style-type: none; padding: 0;">
            <li style="margin: 10px 0; padding-left: 20px; border-left: 2px solid #6366f1;">
              Design System Creation
            </li>
          </ul>
        </div>
      </div>
    `,
    type: 'system'
  },
];

function TemplatePreview({ html, className }: { html: string; className?: string }) {
  return (
    <div className={cn("w-full h-full overflow-hidden bg-white/5 backdrop-blur-sm rounded-md", className)}>
      <iframe
        srcDoc={html}
        title="Template Preview"
        className="w-full h-full border-none"
        sandbox="allow-same-origin"
      />
    </div>
  );
}

function AddTemplateCard({ onClick }: { onClick: () => void }) {
  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer group border-dashed border-border/50 glow ai-card-pattern"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="aspect-[3/4] flex items-center justify-center bg-gradient-to-b from-transparent to-accent/20">
          <div className="text-center space-y-4">
            <PlusCircle className="w-12 h-12 mx-auto text-muted-foreground group-hover:text-primary transition-colors" />
            <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              Add New Template
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PreviewDialog({ template, onClose }: { template: Template; onClose: () => void }) {
  const [editedHtml, setEditedHtml] = useState(template.html);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] border border-border/50 bg-background/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              <span>{template.name}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 h-full">
          <div className="flex-1 min-h-0 glow">
            {isEditing ? (
              <Textarea
                value={editedHtml}
                onChange={(e) => setEditedHtml(e.target.value)}
                className="h-full font-mono bg-card/50"
              />
            ) : (
              <TemplatePreview html={editedHtml} className="h-full" />
            )}
          </div>
          <div className="w-48 space-y-2">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Preview' : 'Edit HTML'}
            </Button>
            <Button className="w-full">Use Template</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TemplateSection({ title, templates, icon: Icon, onAddTemplate }: {
  title: string;
  templates: Template[];
  icon: React.ComponentType<{ className?: string }>;
  onAddTemplate?: () => void;
}) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          {title}
          <Sparkles className="w-4 h-4 text-blue-400" />
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className={cn(
            "overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50 glow ai-card-pattern",
            template.type === 'system' ? 'bg-card/50' : 'bg-card/80'
          )}>
            <CardHeader className="p-3 bg-gradient-to-b from-accent/10">
              <CardTitle className="text-sm flex items-center justify-between">
                {template.name}
                {template.type === 'system' && (
                  <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full border border-primary/20">
                    System
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div 
                className="aspect-[3/4] cursor-pointer bg-gradient-to-b from-transparent to-accent/20"
                onClick={() => setSelectedTemplate(template)}
              >
                <TemplatePreview html={template.html} />
              </div>
            </CardContent>
            <CardFooter className="justify-end p-2 gap-2 bg-gradient-to-t from-accent/10">
              <Button variant="outline" size="sm" onClick={() => setSelectedTemplate(template)}>
                Preview
              </Button>
              <Button size="sm">Use</Button>
            </CardFooter>
          </Card>
        ))}
        {onAddTemplate && <AddTemplateCard onClick={onAddTemplate} />}
      </div>
      {selectedTemplate && (
        <PreviewDialog 
          template={selectedTemplate} 
          onClose={() => setSelectedTemplate(null)} 
        />
      )}
    </div>
  );
}

function AddTemplate({onGoToGenerate}) {
  const [customTemplates, setCustomTemplates] = useState<Template[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [htmlCode, setHtmlCode] = useState('');
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    try {
      const fakeHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #333;">Converted from ${file.name}</h1>
          <p style="color: #666;">This is a placeholder for the converted content.</p>
        </div>
      `;
      const newTemplate: Template = {
        id: Date.now().toString(),
        name: file.name.split('.')[0],
        html: fakeHtml,
        type: 'custom',
      };
      setCustomTemplates([...customTemplates, newTemplate]);
      setIsOpen(false);
      toast({
        title: "Success!",
        description: "Template added successfully",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert template",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  const handleHtmlSubmit = () => {
    if (!htmlCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter HTML code",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const newTemplate: Template = {
      id: Date.now().toString(),
      name: 'Custom Template',
      html: htmlCode,
      type: 'custom',
    };
    setCustomTemplates([...customTemplates, newTemplate]);
    setHtmlCode('');
    setIsOpen(false);
    toast({
      title: "Success!",
      description: "Template added successfully",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onGoToGenerate}>
              Go to Generate
            </Button>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] border border-border/50 bg-background/95 backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  Add New Template
                </DialogTitle>
                <DialogDescription>
                  Upload a template file or paste HTML code directly.
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="code" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="code">HTML Code</TabsTrigger>
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                </TabsList>
                <TabsContent value="code">
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Paste your HTML code here..."
                      value={htmlCode}
                      onChange={(e) => setHtmlCode(e.target.value)}
                      className="min-h-[200px] font-mono bg-card/50"
                    />
                    <Button onClick={handleHtmlSubmit} className="w-full">
                      Add Template
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="upload">
                  <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4 bg-card/50">
                      <input
                        type="file"
                        accept=".doc,.docx,.pdf,.jpg,.jpeg,.png"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <div className="flex gap-4">
                          <FileCode className="w-8 h-8 text-muted-foreground" />
                          <FileImage className="w-8 h-8 text-muted-foreground" />
                          <FileText className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-lg font-medium">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Supports DOC, PDF, JPG, PNG files
                        </p>
                      </label>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>

        <TemplateSection
          title="System Templates"
          templates={systemTemplates}
          icon={LayoutTemplate}
        />

        <Separator className="my-6 opacity-50" />

        <TemplateSection
          title="Custom Templates"
          templates={customTemplates}
          icon={Pencil}
          onAddTemplate={() => setIsOpen(true)}
        />
      </div>
    </div>
  );
}

export default AddTemplate;