import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { HiOutlineTemplate } from "react-icons/hi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdCreate } from "react-icons/md";

interface Template {
  id: string;
  name: string;
  html: string;
  type: "system" | "custom";
  timeStamp: string;
}

const systemTemplates: Template[] = [
  {
    id: "1",
    name: "Modern Professional",
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
    type: "system",
    timeStamp: "17th Jan 2025",
  },
  {
    id: "2",
    name: "Creative Designer",
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
    type: "system",
    timeStamp: "17th Jan 2025",
  },
];

function AddTemplate() {
  return (
    <>
      <div className="container mt-2 w-full flex flex-col items-start">
        <div className="m-auto h-fit flex items-start justify-between w-full pl-10 pr-20 py-2">
          <h1 className="text-lg font-medium flex items-center text-neutral-600 dark:text-neutral-300">
            <HiOutlineTemplate className="size-6 mr-2" />
            System Templates
          </h1>

          <Button>
            <MdOutlineDashboardCustomize className="size-4 mr-2" />
            Add Custom Templates
          </Button>
        </div>

        <div className="mt-3 h-[80vh] w-full px-8">
          <div className="h-full w-full flex flex-wrap items-start gap-6 main_content_sidebar overflow-y-scroll">
            {systemTemplates.map((template) => (
              <div key={template.id} className="w-[290px] h-[250px] group">
                <div className="flex w-full h-full flex-col p-3 bg-secondary group-hover:bg-primary-foreground dark:bg-primary-foreground dark:group-hover:bg-secondary rounded-md">
                  <h1 className="text-sm text-neutral-800 dark:text-neutral-400 font-semibold">
                    {template.name}
                  </h1>

                  <div
                    className={
                      "w-full h-[120px] mt-3 overflow-hidden bg-white/5 backdrop-blur-sm rounded-md border-2"
                    }
                  >
                    <iframe
                      srcDoc={template.html}
                      title="Template Preview"
                      className="w-full h-full border-none"
                      sandbox="allow-same-origin"
                    />
                  </div>

                  <div className="mt-2 w-full flex flex-col">
                    <div className="w-full flex items-center justify-between">
                      <span className="text-xs dark:text-neutral-400 text-neutral-800 font-semibold">
                        {template.timeStamp}
                      </span>
                      <Badge className="bg-neutral-600 hover:bg-neutral-800 dark:bg-neutral-400 dark:hover:bg-neutral-200 capitalize">
                        {template.type}
                      </Badge>
                    </div>
                    <div className="w-full flex items-center justify-between gap-3 mt-3">
                      <Button
                        variant={"outline"}
                        className="w-1/2 flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </Button>
                      <Button
                        variant={"outline"}
                        className="w-1/2 flex items-center gap-2"
                      >
                        <MdCreate className="w-4 h-4" />
                        Use this
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTemplate;
