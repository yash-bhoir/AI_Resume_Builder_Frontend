import { useState, ChangeEvent, useEffect, useCallback } from "react";
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
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { RESUME_ENDPOINTS } from "@/lib/endpoints";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { FormData } from "@/interface/resume-interface";

// TODO: fixes edit resume and binding
interface GenerateResumeFlowProps {
  isOpen: boolean;
  onClose: () => void;
  initialFormData?: FormData;
  isUpdateResume?: string;
}

const steps = [
  "Basic Information",
  "Career Summary",
  "Work Experience",
  "Education",
  "Skills",
  "Projects",
];

const GenerateResumeFlow: React.FC<GenerateResumeFlowProps> = ({
  isOpen,
  onClose,
  initialFormData,
  isUpdateResume,
}) => {
  const [step, setStep] = useState<number>(0);
  const [isProfessionSelectOpen, setIsProfessionSelectOpen] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(
    initialFormData || {
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
    }
  );
  const [selectedCode, setSelectedCode] = useState<string>("+91");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isTemplateNameUnique, setIsTemplateNameUnique] = useState<
    boolean | null
  >(null);
  const { userId } = useAuth();

  const navigate = useNavigate();
  const { user } = useUser();

  const validateStep = () => {
    let newErrors: Record<string, string> = {};

    if (step === 0) {
      // Skip resumeName validation when updating if it hasn't changed
      if (
        !isUpdateResume ||
        formData.resumeName !== initialFormData?.resumeName
      ) {
        if (!formData.resumeName.trim()) {
          newErrors.resumeName = "Template name is required";
        }
        if (
          formData.resumeName &&
          formData.resumeName.length < 3 &&
          formData.resumeName.trim()
        ) {
          newErrors.resumeName = "Template name must be at least 3 characters";
        }
        if (formData.resumeName && formData.resumeName.length > 50) {
          newErrors.resumeName =
            "Template name must be less than 50 characters";
        }
      }

      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Invalid phone number";
      }
    }

    if (step === 1) {
      if (!formData.workingProfession.trim()) {
        newErrors.workingProfession = "Working profession is required";
      }
      if (!formData.careerSummary.trim()) {
        newErrors.careerSummary = "Career summary is required";
      }
      if (formData.careerSummary.trim() && formData.careerSummary.length < 20) {
        newErrors.careerSummary =
          "Career summary must be at least 20 characters";
      }
      if (
        formData.careerSummary.trim() &&
        formData.careerSummary.length > 200
      ) {
        newErrors.careerSummary =
          "Career summary must be less than 200 characters";
      }
    }

    if (step === 4) {
      if (formData.skills.length === 0) {
        newErrors.skills = "At least one skill is required";
      }
      if (formData.skills.length > 5) {
        newErrors.skills = "Only 5 skills are allowed";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleCreateResume = async () => {
    try {
      const templateId = uuidv4();
      const response = await axios.post(`${RESUME_ENDPOINTS.RESUME_CREATE}`, {
        ...formData,
        templateId,
        userId: user?.id,
      });
      toast.success("Resume created successfully!");

      if (response) {
        navigate(`/generate/${templateId}`, {
          state: { formData },
        });
      }
    } catch (error: any) {
      console.error("Error creating resume:", error);
      toast.error(error?.response?.data?.message || "Failed to create resume");
    }
  };

  const handleUpdateResume = async () => {
    try {
      await axios.put(`${RESUME_ENDPOINTS.RESUME_UPDATE}`, {
        ...formData,
        resumeId: isUpdateResume,
        userId: user?.id,
      });
      toast.success("Resume updated successfully!");
    } catch (error: any) {
      console.error("Error creating resume:", error);
      toast.error(error?.response?.data?.message || "Failed to create resume");
    }
  };

  const handleSubmit = () => {
    if (validateStep()) {
      console.log(isUpdateResume);

      if (isUpdateResume) {
        handleUpdateResume();
      } else {
        handleCreateResume();
      }
      onClose();
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newSkill = e.currentTarget.value.trim();
      if (newSkill && !formData.skills.includes(newSkill)) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, newSkill],
        }));
        e.currentTarget.value = "";
      }
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleCheckTemplateNameUniqueness = useCallback(() => {
    if (!formData.resumeName) return;

    if (isUpdateResume && formData.resumeName === initialFormData?.resumeName) {
      setIsTemplateNameUnique(true);
      setErrors((prev) => ({ ...prev, resumeName: "" }));
      return;
    }

    const parameters = {
      userId: userId,
      templateName: formData.resumeName,
    };

    axios
      .post(`${RESUME_ENDPOINTS.RESUME_TEMPLATE_NAME_UNIQUE}`, parameters)
      .then(() => {
        setIsTemplateNameUnique(true);
        setErrors((prev) => ({ ...prev, resumeName: "" }));
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          setIsTemplateNameUnique(false);
          setErrors((prev) => ({
            ...prev,
            resumeName: "Template name already exists",
          }));
        }
      });
  }, [formData.resumeName, userId, isUpdateResume, initialFormData]);

  useEffect(() => {
    setStep(0);
    setErrors({});
  }, [isOpen]);

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  useEffect(() => {
    const handler = setTimeout(() => {
      handleCheckTemplateNameUniqueness();
    }, 500);

    return () => clearTimeout(handler);
  }, [formData.resumeName, handleCheckTemplateNameUniqueness]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-h-[540px] h-fit max-h-[650px] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {" "}
            {initialFormData ? "Edit Resume" : "Create a new Resume"}
          </DialogTitle>
          <DialogDescription>
            {initialFormData
              ? "Edit your existing resume details"
              : "Create a new resume by filling out the fields"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between px-2">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                  index === step
                    ? "border-blue-500 text-indigo-500"
                    : index < step
                    ? "border-green-500 text-green-500"
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
                  className={`h-[2px] w-16 transition-colors ${
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
              <div className="flex flex-col relative items-start w-full gap-3">
                <Label>Template name</Label>
                <Input
                  name="resumeName"
                  placeholder="Enter template name"
                  value={formData.resumeName}
                  onChange={handleChange}
                  autoComplete="off"
                  className={errors.resumeName ? "border-red-500" : ""}
                />
                {formData.resumeName.trim().length > 0 &&
                  isTemplateNameUnique !== null && (
                    <span
                      className={`w-4 h-4 rounded-full text-white flex items-center justify-center absolute bottom-2 right-3 ${
                        isTemplateNameUnique ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {isTemplateNameUnique ? (
                        <FaCheck className="size-2" />
                      ) : (
                        <FaTimes className="size-2" />
                      )}
                    </span>
                  )}
                {errors.resumeName && (
                  <p className="text-red-500 text-sm">{errors.resumeName}</p>
                )}
              </div>
              <>
                <Label>Full Name</Label>
                <Input
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="off"
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName}</p>
                )}
              </>
              <>
                <Label>Email Address</Label>
                <Input
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
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
                            key={code.name}
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
                    className={errors.phoneNumber ? "border-red-500" : ""}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
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
                {errors.workingProfession && (
                  <p className="text-red-500 text-sm">
                    {errors.workingProfession}
                  </p>
                )}
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
                {errors.careerSummary && (
                  <p className="text-red-500 text-sm">{errors.careerSummary}</p>
                )}
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
                {errors.skills && (
                  <p className="text-red-500 text-sm">{errors.skills}</p>
                )}
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
        </div>
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
            <Button onClick={handleSubmit}>
              {initialFormData ? "Update Resume" : "Create Resume"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateResumeFlow;
