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

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateProject = () => {
    let newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    } else if (formData.name.length < 10 || formData.name.length > 100) {
      newErrors.name = "Project name must be between 10 to 100 characters";
    }

    if (!formData.technologies.trim()) {
      newErrors.technologies = "Technologies used are required";
    } else if (
      formData.technologies.length < 5 ||
      formData.technologies.length > 100
    ) {
      newErrors.technologies =
        "Technologies must be between 5 to 100 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (
      formData.description.length < 20 ||
      formData.description.length > 250
    ) {
      newErrors.description =
        "Description must be between 20 to 250 characters";
    }

    const isDuplicate = projects.some(
      (project) =>
        project.name.trim().toLowerCase() ===
          formData.name.trim().toLowerCase() &&
        project.technologies.trim().toLowerCase() ===
          formData.technologies.trim().toLowerCase()
    );

    if (isDuplicate) {
      newErrors.general = "Duplicate project entry is not allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateProject()) {
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
      {projects.length < 3 && (
        <Button onClick={() => setIsOpen(true)} variant={"outline"}>
          Add Project
        </Button>
      )}

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
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}

            <Input
              placeholder="Technologies Used"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
            />
            {errors.technologies && (
              <span className="text-red-500 text-sm">
                {errors.technologies}
              </span>
            )}

            <Textarea
              placeholder="Brief Description (1-2 sentences)"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description}
              </span>
            )}

            <Input
              placeholder="Deployed Link (optional)"
              name="deployedLink"
              value={formData.deployedLink}
              onChange={handleChange}
            />

            {errors.general && (
              <span className="text-red-500 text-sm">{errors.general}</span>
            )}

            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>

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
