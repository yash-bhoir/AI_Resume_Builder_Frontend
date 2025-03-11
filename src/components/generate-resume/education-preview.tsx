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

interface Education {
  degree: string;
  university: string;
  graduationYear: string;
}

interface EducationPreviewProps {
  education: Education[];
  onUpdateEducation: (newEducation: Education[]) => void;
}

const EducationPreview = ({
  education,
  onUpdateEducation,
}: EducationPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState<Education>({
    degree: "",
    university: "",
    graduationYear: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (education.length < 3) {
      onUpdateEducation([...education, formData]);

      setFormData({
        degree: "",
        university: "",
        graduationYear: "",
      });

      setIsOpen(false);
    }
  };

  const handleDelete = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    onUpdateEducation(updatedEducation);
  };

  return (
    <div className="w-full flex flex-col gap-4 h-full">
      {/* Add Button */}
      {education.length < 3 && (
        <Button onClick={() => setIsOpen(true)} variant={"outline"}>
          Add Education
        </Button>
      )}

      {/* Education Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Education</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
            />
            <Input
              placeholder="University"
              name="university"
              value={formData.university}
              onChange={handleChange}
            />
            <Input
              placeholder="Graduation Year"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Display Education */}
      {education.length > 0 && (
        <div className="flex flex-col items-start gap-3 border-t pt-4">
          {education.map((edu, index) => (
            <div
              key={index}
              className="w-full border p-3 rounded-md relative border-indigo-500"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-md font-semibold">{edu.degree}</h3>
                  <p className="text-xs font-semibold dark:text-neutral-400 text-neutral-500">
                    {edu.university} - {edu.graduationYear}
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

export default EducationPreview;
