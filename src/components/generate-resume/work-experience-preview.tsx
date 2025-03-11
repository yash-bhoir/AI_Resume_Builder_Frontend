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

interface WorkExperiencePreviewProps {
  experience: WorkExperience[];
  onUpdateExperience: (newExperience: WorkExperience[]) => void;
}

interface WorkExperience {
  jobTitle: string;
  companyName: string;
  duration: string;
  responsibilities: string;
  achievements: string;
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
    responsibilities: "",
    achievements: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (experience.length < 3) {
      // Directly pass the updated array
      onUpdateExperience([...experience, formData]);
  
      setFormData({
        jobTitle: "",
        companyName: "",
        duration: "",
        responsibilities: "",
        achievements: "",
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
      {/* Add Button */}
      {experience.length < 3 && (
        <Button onClick={() => setIsOpen(true)} variant={"outline"}>
          Add Work Experience
        </Button>
      )}

      {/* Work Experience Modal */}
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
            <Input
              placeholder="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
            <Input
              placeholder="Employment Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
            <Textarea
              placeholder="Key Responsibilities"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
            />
            <Textarea
              placeholder="Achievements"
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Display Work Experience */}
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
                  <FaTrash/>
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
