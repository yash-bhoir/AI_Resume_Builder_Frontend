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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateEducation = () => {
    let newErrors: Record<string, string> = {};

    if (!formData.degree.trim()) {
      newErrors.degree = "Degree is required";
    } else if (formData.degree.length < 10 || formData.degree.length > 100) {
      newErrors.degree = "Degree must be between 10 to 100 characters";
    }

    if (!formData.university.trim()) {
      newErrors.university = "University is required";
    } else if (
      formData.university.length < 10 ||
      formData.university.length > 100
    ) {
      newErrors.university = "University must be between 10 to 100 characters";
    }

    if (!formData.graduationYear.trim()) {
      newErrors.graduationYear = "Graduation year is required";
    } else if (!/^\d{4}$/.test(formData.graduationYear)) {
      newErrors.graduationYear = "Invalid graduation year format";
    }

    const isDuplicate = education.some(
      (edu) =>
        edu.degree.trim().toLowerCase() ===
          formData.degree.trim().toLowerCase() &&
        edu.university.trim().toLowerCase() ===
          formData.university.trim().toLowerCase() &&
        edu.graduationYear === formData.graduationYear
    );

    if (isDuplicate) {
      newErrors.general = "Duplicate education entry is not allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateEducation()) {
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
      {education.length < 3 && (
        <Button onClick={() => setIsOpen(true)} variant="outline">
          Add Education
        </Button>
      )}

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
            {errors.degree && (
              <span className="text-red-500 text-sm">{errors.degree}</span>
            )}

            <Input
              placeholder="University"
              name="university"
              value={formData.university}
              onChange={handleChange}
            />
            {errors.university && (
              <span className="text-red-500 text-sm">{errors.university}</span>
            )}

            <Input
              placeholder="Graduation Year"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
            />
            {errors.graduationYear && (
              <span className="text-red-500 text-sm">
                {errors.graduationYear}
              </span>
            )}

            {errors.general && (
              <span className="text-red-500 text-sm">{errors.general}</span>
            )}

            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>

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
