import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaTrash } from "react-icons/fa6";

interface Project {
  name: string;
  technologies: string;
  description: string;
  deployedLink?: string;
}

interface ProjectPreviewProps {
  projects: Project[];
  onUpdateProjects: (newProjects: Project[]) => void;
}

const ProjectPreview = ({
  projects,
  onUpdateProjects,
}: ProjectPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState<Project>({
    name: "",
    technologies: "",
    description: "",
    deployedLink: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (projects.length < 3) {
      onUpdateProjects([...projects, formData]);

      setFormData({
        name: "",
        technologies: "",
        description: "",
        deployedLink: "",
      });

      setIsOpen(false);
    }
  };

  const handleDelete = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    onUpdateProjects(updatedProjects);
  };

  return (
    <div className="w-full flex flex-col gap-4 h-full">
      {/* Add Button */}
      {projects.length < 3 && (
        <Button onClick={() => setIsOpen(true)} variant={"outline"}>
          Add Project
        </Button>
      )}

      {/* Project Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Project Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              placeholder="Technologies Used"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
            />
            <Textarea
              placeholder="Brief Description (1-2 sentences)"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <Input
              placeholder="Deployed Link (optional)"
              name="deployedLink"
              value={formData.deployedLink}
              onChange={handleChange}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Display Projects */}
      {projects.length > 0 && (
        <div className="flex flex-col items-start gap-3 border-t pt-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="w-full border p-3 rounded-md relative border-indigo-500"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-md font-semibold">{project.name}</h3>
                  <p className="text-xs font-semibold dark:text-neutral-400 text-neutral-500">
                    {project.technologies}
                  </p>
                  {project.deployedLink && (
                    <a
                      href={project.deployedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 text-xs hover:underline mt-1 block"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <Button
                  onClick={() => handleDelete(index)}
                  variant="outline"
                  className="text-red-500 border-0"
                >
                  <FaTrash />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectPreview;
