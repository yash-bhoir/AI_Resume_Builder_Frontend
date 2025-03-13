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
import { Check, ChevronsUpDown, Circle, X } from "lucide-react";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn, CountryDialCodes, ProfessionalTitleList } from "@/lib/utils";
import WorkExperiencePreview from "./work-experience-preview";
import EducationPreview from "./education-preview";
import ProjectPreview from "./project-preview";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Badge } from "../ui/badge";
import CertificationPreview from "./certification-preview";

interface GenerateResumeFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WorkExperience {
  jobTitle: string;
  companyName: string;
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
  deployedLink?: string;
}

interface Certifications {
  name: string;
  issuedBy: string;
  issueDate: string;
  deployedLink?: string;
}

const steps = [
  "Basic Information",
  "Career Summary",
  "Work Experience",
  "Education",
  "Skills",
  "Projects",
  "Review & Submit",
];

const GenerateResumeFlow: React.FC<GenerateResumeFlowProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<number>(0);
  const [isProfessionSelectOpen, setIsProfessionSelectOpen] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<{
    fullName: string;
    email: string;
    workingProfession: string;
    careerSummary: string;
    experience: WorkExperience[];
    education: Education[];
    skills: string[];
    certification: Certifications[];
    projects: Project[];
    resumeName: string;
    phoneNumber: string;
  }>({
    fullName: "",
    email: "",
    workingProfession: "",
    careerSummary: "",
    experience: [],
    education: [],
    skills: [],
    certification: [],
    projects: [],
    resumeName: "",
    phoneNumber: "",
  });

  const [selectedCode, setSelectedCode] = useState<string>("+91");

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

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newSkill = e.currentTarget.value.trim();
      if (newSkill && !formData.skills.includes(newSkill)) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, newSkill],
        }));
        e.currentTarget.value = ""; // Clear input after adding
      }
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
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
                  autoComplete="off"
                />
              </>
              <>
                <Label>Full Name</Label>
                <Input
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="off"
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
              <>
                <Label>Phone Number</Label>
                <div className="flex items-center gap-2">
                  <Select onValueChange={(value) => setSelectedCode(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={selectedCode} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {CountryDialCodes.map((code) => (
                          <SelectItem
                            key={code.dial_code}
                            value={code.dial_code}
                            onClick={() => setSelectedCode(code.dial_code)}
                          >
                            {code.dial_code} — {code.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Input
                    name="phoneNumber"
                    placeholder="00000 00000"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
              </>
            </div>
          )}

          {/* Step 2: Career Summary */}
          {step === 1 && (
            <div className="flex flex-col items-start gap-3">
              <>
                <Label>Working profession</Label>
                <Popover
                  open={isProfessionSelectOpen}
                  onOpenChange={setIsProfessionSelectOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isProfessionSelectOpen}
                      className="w-full justify-between"
                    >
                      {formData.workingProfession || "Select profession..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search profession..." />
                      <CommandList>
                        <CommandEmpty>No profession found.</CommandEmpty>
                        <CommandGroup>
                          {ProfessionalTitleList.map((option) => (
                            <CommandItem
                              key={option}
                              value={option}
                              onSelect={(value) => {
                                setFormData((prev) => ({
                                  ...prev,
                                  workingProfession: value,
                                }));
                                setIsProfessionSelectOpen(false);
                              }}
                            >
                              {option}
                              <Check
                                className={cn(
                                  "ml-auto size-4",
                                  formData.workingProfession === option
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
            <div className="flex flex-col items-start gap-3 h-[315px] overflow-y-scroll main_content_sidebar">
              <WorkExperiencePreview
                experience={formData.experience}
                onUpdateExperience={(newExperience) =>
                  setFormData((prev) => ({
                    ...prev,
                    experience: newExperience,
                  }))
                }
              />
            </div>
          )}

          {/* Step 4: Education */}
          {step === 3 && (
            <EducationPreview
              education={formData.education}
              onUpdateEducation={(newEducation) =>
                setFormData((prev) => ({ ...prev, education: newEducation }))
              }
            />
          )}

          {/* Step 5: Skills */}
          {step === 4 && (
            <div className="flex w-full flex-col items-start">
              <div className="flex flex-col items-start w-full max-h-[100px] h-fit">
                {/* Input Box */}
                <div className="w-full relative">
                  <Input
                    name="skills"
                    placeholder="Top 5 Skills (comma-separated)"
                    onKeyDown={handleAddSkill}
                  />
                  <div className="absolute top-1 right-2 flex items-center text-xs border-2 text-neutral-500 font-semibold p-1 rounded-md">
                    <MdSubdirectoryArrowRight />
                    Enter
                  </div>
                </div>

                {/* Display Skills as Badges */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} className="flex items-center">
                      {skill}
                      <X
                        className="ml-1 h-4 w-4 cursor-pointer"
                        onClick={() => handleRemoveSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="w-full flex flex-col items-start mt-4">
                <h1 className="font-bold text-neutral-600 dark:text-neutral-300 mb-2">
                  Certifications
                </h1>
                <CertificationPreview
                  certifications={formData.certification}
                  onUpdateCertifications={(newCertifications) =>
                    setFormData((prev) => ({
                      ...prev,
                      certification: newCertifications,
                    }))
                  }
                />
              </div>
            </div>
          )}

          {/* Step 6: Projects */}
          {step === 5 && (
            <ProjectPreview
              projects={formData.projects}
              onUpdateProjects={(newProjects) =>
                setFormData((prev) => ({ ...prev, projects: newProjects }))
              }
            />
          )}

          {/* Step 7: Review & Submit */}
          {step === 6 && (
            <div>
              <pre className="text-sm bg-gray-100 p-3 rounded-md mt-2 h-[300px] overflow-y-scroll">
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
