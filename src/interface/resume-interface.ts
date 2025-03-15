export interface FormData {
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
}

export interface WorkExperience {
  jobTitle: string;
  companyName: string;
  duration: string;
}

export interface Education {
  degree: string;
  university: string;
  graduationYear: string;
}

export interface Project {
  name: string;
  technologies: string;
  description: string;
  deployedLink?: string;
}

export interface Certifications {
  name: string;
  issuedBy: string;
  issueDate: string;
  deployedLink?: string;
}
