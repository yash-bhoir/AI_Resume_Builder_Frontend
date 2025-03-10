import { useState, ChangeEvent, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Check, Circle } from "lucide-react";

interface GenerateResumeFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Experience {
  workingProfession: string;
  company: string;
  duration: string;
  responsibilities: string;
  achievements: string;
}

interface Education {
  degree: string;
  university: string;
  graduationYear: string;
}

interface Project {
  name: string;
  technologies: string;
  description: string;
}

interface FormData {
  fullName: string;
  email: string;
  workingProfession: string;
  careerSummary: string;
  experience: Experience[];
  education: Education[];
  skills: string;
  projects: Project[];
  resumeName: string;
}

const steps = [
  "Basic Information",
  "Career Summary",
  "Work Experience",
  "Education",
  "Skills & Certifications",
  "Projects",
  "Review & Submit",
];

const GenerateResumeFlow: React.FC<GenerateResumeFlowProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    workingProfession: "",
    careerSummary: "",
    experience: [],
    education: [],
    skills: "",
    projects: [],
    resumeName: "",
  });

  useEffect(() => {
    setStep(0);
  }, [isOpen]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    console.log("Final Data:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[540px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create a new resume</DialogTitle>
          <DialogDescription>
            Generate a new resume by following the steps below
          </DialogDescription>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-between px-2">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                  index === step
                    ? "border-blue-500 bg-blue-50 text-indigo-500"
                    : index < step
                    ? "border-green-500 bg-green-50 text-green-500"
                    : "border-gray-300 text-gray-300"
                }`}
              >
                {index < step ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-[2px] w-12 transition-colors ${
                    index < step ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex w-full h-full flex-col">
          <h1 className="font-bold text-neutral-600 dark:text-neutral-300 mb-2">
            {steps[step]}
          </h1>

          {/* Step 1: Basic Information */}
          {step === 0 && (
            <div className="flex flex-col items-start gap-3">
              <>
                <Label> Template name</Label>
                <Input
                  name="resumeName"
                  placeholder="Enter template name"
                  value={formData.resumeName}
                  onChange={handleChange}
                />
              </>
              <>
                <Label>Full Name</Label>
                <Input
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </>
              <>
                <Label>Email Address</Label>
                <Input
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </>
            </div>
          )}

          {/* Step 2: Career Summary */}
          {step === 1 && (
            <div className="flex flex-col items-start gap-3">
              <>
                <Label>Working profession</Label>
                <Input
                  name="workingProfession"
                  placeholder="Enter working profession"
                  value={formData.workingProfession}
                  onChange={handleChange}
                />
              </>

              <>
                <Label>Describe your career journey</Label>
                <Textarea
                  name="careerSummary"
                  placeholder="Briefly describe your career"
                  value={formData.careerSummary}
                  onChange={handleChange}
                  className="h-36 resize-none"
                />
              </>
            </div>
          )}

          {/* Step 3: Work Experience */}
          {step === 2 && (
            <div>
              <Input placeholder="Job Title" />
              <Input placeholder="Company Name" className="mt-2" />
              <Input placeholder="Employment Duration" className="mt-2" />
              <Textarea placeholder="Key Responsibilities" className="mt-2" />
              <Textarea placeholder="Achievements" className="mt-2" />
            </div>
          )}

          {/* Step 4: Education */}
          {step === 3 && (
            <div>
              <Input placeholder="Degree Name" />
              <Input placeholder="University/College" className="mt-2" />
              <Input placeholder="Year of Graduation" className="mt-2" />
            </div>
          )}

          {/* Step 5: Skills & Certifications */}
          {step === 4 && (
            <Input
              name="skills"
              placeholder="Top 5 Skills (comma-separated)"
              value={formData.skills}
              onChange={handleChange}
            />
          )}

          {/* Step 6: Projects */}
          {step === 5 && (
            <div>
              <Input placeholder="Project Name" />
              <Input placeholder="Technologies Used" className="mt-2" />
              <Textarea
                placeholder="Brief Description (1-2 sentences)"
                className="mt-2"
              />
            </div>
          )}

          {/* Step 7: Review & Submit */}
          {step === 6 && (
            <div>
              <h3 className="font-semibold">Review & Submit</h3>
              <pre className="text-sm bg-gray-100 p-3 rounded-md mt-2">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-auto">
            {step > 0 && (
              <Button onClick={prevStep} variant={"outline"}>
                Previous
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button onClick={nextStep} className="ml-auto">
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Submit</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateResumeFlow;
