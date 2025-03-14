import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaTrash } from "react-icons/fa6";

interface WorkExperiencePreviewProps {
  experience: WorkExperience[];
  onUpdateExperience: (newExperience: WorkExperience[]) => void;
}

interface WorkExperience {
  jobTitle: string;
  companyName: string;
  duration: string;
}

const WorkExperiencePreview = ({
  experience,
  onUpdateExperience,
}: WorkExperiencePreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState<WorkExperience>({
    jobTitle: "",
    companyName: "",
    duration: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error when user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateExperience = () => {
    let newErrors: Record<string, string> = {};

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    } else if (formData.jobTitle.length < 10 || formData.jobTitle.length > 80) {
      newErrors.jobTitle = "Job title must be between 10 to 80 characters";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    } else if (
      formData.companyName.length < 10 ||
      formData.companyName.length > 80
    ) {
      newErrors.companyName =
        "Company name must be between 10 to 80 characters";
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required";
    } else if (formData.duration.length > 20) {
      newErrors.duration =
        "Duration characters should not exceed more than 20.";
    }

    const isDuplicate = experience.some(
      (exp) =>
        (exp.jobTitle.trim().toLowerCase() ===
          formData.jobTitle.trim().toLowerCase() &&
          exp.companyName.trim().toLowerCase() ===
            formData.companyName.trim().toLowerCase()) ||
        exp.companyName.trim().toLowerCase() ===
          formData.companyName.trim().toLowerCase()
    );
    if (isDuplicate) {
      newErrors.general = "Duplicate work experience is not allowed";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = () => {
    if (validateExperience()) {
      onUpdateExperience([...experience, formData]);

      setFormData({
        jobTitle: "",
        companyName: "",
        duration: "",
      });
      setIsOpen(false);
    }
  };

  const handleDelete = (index: number) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    onUpdateExperience(updatedExperience);
  };

  return (
    <div className="w-full flex flex-col gap-4 h-full">
      {experience.length < 3 && (
        <Button onClick={() => setIsOpen(true)} variant="outline">
          Add Work Experience
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Work Experience</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
            />
            {errors.jobTitle && (
              <span className="text-red-500 text-sm">{errors.jobTitle}</span>
            )}

            <Input
              placeholder="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
            {errors.companyName && (
              <span className="text-red-500 text-sm">{errors.companyName}</span>
            )}

            <Input
              placeholder="Employment Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
            {errors.duration && (
              <span className="text-red-500 text-sm">{errors.duration}</span>
            )}

            {errors.general && (
              <span className="text-red-500 text-sm">{errors.general}</span>
            )}

            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>

      {experience.length > 0 && (
        <div className="flex flex-col items-start gap-3 border-t pt-2">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="w-full border p-3 rounded-md relative border-indigo-500"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-md font-semibold">{exp.jobTitle}</h3>
                  <p className="text-xs font-semibold dark:text-neutral-400 text-neutral-500">
                    {exp.companyName} - {exp.duration}
                  </p>
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

export default WorkExperiencePreview;
