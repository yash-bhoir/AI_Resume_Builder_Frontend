import { FormData } from "@/interface/resume-interface";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface Template {
  id: string;
  name: string;
  html: string;
  type: "system" | "custom";
  timeStamp: string;
  stars: number;
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GetRandomResponse = (responses: string[]): string => {
  if (responses.length === 0) return "No response available.";

  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};

export const ASSISTANT_RESPONSES = [
  "Sure, I can help with that.",
  "Let me look that up for you.",
  "That's a great question!",
  "Here's what I found for you.",
  "I'm working on it, give me a second.",
  "Let me think about that for a moment.",
  "Interesting! Let me figure that out for you.",
  "I'm on it! Just give me a moment.",
  "Let me process that for you.",
  "That's a tricky one! Let me work on it.",
  "I’m analyzing the details, give me a second.",
  "Hold on, I’m gathering the information.",
  "I'm fetching the data you need.",
  "I'm putting the pieces together now.",
  "Almost there! Just one moment.",
  "I'll get back to you on that shortly.",
  "Just a sec, I’m working it out.",
  "Let me double-check that for you.",
  "I'm compiling the information right now.",
  "Hang tight, I’m piecing it together.",
  "I'm reviewing the data for you.",
  "Give me a second, I’m checking that out.",
  "I'm processing your request as we speak.",
  "Let me verify that for you.",
  "I'm on it! Just need a second.",
  "That's a good one! Let me think for a second.",
  "Let me cross-check the details for you.",
  "I'm running the numbers for you.",
  "Just checking my sources, one sec.",
  "Let me dig deeper into that.",
  "One moment, I'm almost there!",
  "Give me a moment to confirm that.",
  "Let me see what I can find for you.",
  "That's a good point! Let me verify it.",
  "I’m working through the details right now.",
  "Let me clarify that for you.",
  "Almost done! Hang in there.",
  "I’m getting the details for you now.",
  "Let me check my sources real quick.",
  "Let me think that through for a moment.",
  "I’m gathering more details for you.",
  "This might take a second, hold on.",
  "Let me align the facts for you.",
  "On it! Just reviewing the details.",
  "Give me a second while I dig into that.",
  "Let me organize the info for you.",
  "I’m checking the data right now.",
  "Hold on! I’m reviewing it now.",
  "Just double-checking that for you.",
  "Let me confirm the details for you.",
  "I’m almost there, just hold tight!",
];

export const SYSTEM_TEMPLATES : Template[] = [
  {
    id: "1",
    name: "Modern Professional Resume",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h1 style="color: #2563eb; font-size: 24px;">John Doe</h1>
        <p style="color: #666;">Senior Software Engineer</p>
        <div style="margin: 20px 0; height: 2px; background: #e5e7eb;"></div>
        <h2 style="color: #2563eb; font-size: 18px;">Experience</h2>
        <div style="margin: 10px 0;">
          <h3 style="font-size: 16px;">Tech Corp - Senior Developer</h3>
          <p style="color: #666;">2020 - Present</p>
        </div>
      </div>
    `,
    type: "system",
    timeStamp: "17th Jan 2025",
    stars: 42,
  },
  {
    id: "2",
    name: "Creative Designer Resume",
    html: `
      <div style="font-family: 'Helvetica', sans-serif; padding: 20px; background: #f8f9fa;">
        <div style="text-align: center;">
          <h1 style="color: #6366f1; font-size: 28px; margin: 0;">Sarah Smith</h1>
          <p style="color: #4b5563; margin-top: 5px;">UI/UX Designer</p>
        </div>
        <div style="margin: 20px 0; height: 3px; background: linear-gradient(to right, #6366f1, #8b5cf6);"></div>
        <div style="margin-top: 20px;">
          <h2 style="color: #6366f1; font-size: 20px;">Portfolio Highlights</h2>
          <ul style="list-style-type: none; padding: 0;">
            <li style="margin: 10px 0; padding-left: 20px; border-left: 2px solid #6366f1;">
              Design System Creation
            </li>
          </ul>
        </div>
      </div>
    `,
    type: "system",
    timeStamp: "09th April 2025",
    stars: 17,
  },
  {
    id: "3",
    name: "Executive Summary Resume",
    html: `
      <div style="font-family: 'Georgia', serif; padding: 20px; color: #444;">
        <h1 style="color: #1e293b; font-size: 26px;">Michael Johnson</h1>
        <p style="color: #64748b;">Chief Operating Officer</p>
        <hr style="border: 1px solid #1e293b; margin: 20px 0;" />
        <h2 style="font-size: 20px; color: #1e293b;">Experience</h2>
        <p>Leading strategic operations and driving company growth for 10+ years.</p>
      </div>
    `,
    type: "system",
    timeStamp: "21st Feb 2025",
    stars: 33,
  },
  {
    id: "4",
    name: "Minimalist Freelancer Resume",
    html: `
      <div style="font-family: 'Arial', sans-serif; padding: 20px; color: #222;">
        <h1 style="font-size: 22px; color: #334155;">Alex Lee</h1>
        <p style="font-size: 16px; color: #64748b;">Freelance Web Developer</p>
        <h2 style="font-size: 18px; color: #334155;">Skills</h2>
        <ul style="padding-left: 20px; color: #475569;">
          <li>JavaScript, React, Node.js</li>
          <li>API Integration, Web Performance</li>
        </ul>
      </div>
    `,
    type: "system",
    timeStamp: "05th March 2025",
    stars: 28,
  },
  {
    id: "5",
    name: "Classic Accountant Resume",
    html: `
      <div style="font-family: 'Times New Roman', serif; padding: 20px; color: #333;">
        <h1 style="font-size: 24px; color: #2563eb;">Emily Davis</h1>
        <p style="font-size: 16px; color: #4b5563;">Certified Public Accountant</p>
        <div style="margin-top: 20px;">
          <h2 style="font-size: 18px; color: #2563eb;">Experience</h2>
          <p>Managed audits and tax filings for Fortune 500 companies.</p>
        </div>
      </div>
    `,
    type: "system",
    timeStamp: "12th May 2025",
    stars: 19,
  },
  {
    id: "6",
    name: "Corporate Consultant Resume",
    html: `
      <div style="font-family: 'Arial', sans-serif; padding: 20px; color: #333;">
        <h1 style="color: #1e3a8a; font-size: 24px;">Jane Smith</h1>
        <p style="color: #64748b;">Business Consultant</p>
        <div style="margin-top: 20px;">
          <h2 style="font-size: 18px; color: #1e3a8a;">Skills</h2>
          <ul style="padding-left: 20px; color: #475569;">
            <li>Strategic Planning</li>
            <li>Market Analysis</li>
          </ul>
        </div>
      </div>
    `,
    type: "system",
    timeStamp: "18th June 2025",
    stars: 24,
  },
  {
    id: "7",
    name: "Elegant Marketing Resume",
    html: `
      <div style="font-family: 'Verdana', sans-serif; padding: 20px; color: #333;">
        <h1 style="color: #9333ea; font-size: 24px;">Olivia Taylor</h1>
        <p style="color: #6b7280;">Marketing Specialist</p>
        <div style="margin-top: 20px;">
          <h2 style="font-size: 18px; color: #9333ea;">Key Achievements</h2>
          <ul style="padding-left: 20px; color: #475569;">
            <li>Increased customer engagement by 35%</li>
            <li>Managed successful product launch campaigns</li>
          </ul>
        </div>
      </div>
    `,
    type: "system",
    timeStamp: "27th July 2025",
    stars: 31,
  },
  {
    id: "8",
    name: "Tech Startup Resume",
    html: `
      <div style="font-family: 'Roboto', sans-serif; padding: 20px; color: #333;">
        <h1 style="color: #2563eb; font-size: 24px;">Liam Brown</h1>
        <p style="color: #6b7280;">Startup Founder & CEO</p>
        <div style="margin-top: 20px;">
          <h2 style="font-size: 18px; color: #2563eb;">Highlights</h2>
          <ul style="padding-left: 20px; color: #475569;">
            <li>Raised $2M in seed funding</li>
            <li>Expanded team from 3 to 20+ employees</li>
          </ul>
        </div>
      </div>
    `,
    type: "system",
    timeStamp: "15th Aug 2025",
    stars: 37,
  },
  {
    id: "9",
    name: "Data Scientist Resume",
    html: `
      <div style="font-family: 'Arial', sans-serif; padding: 20px; color: #333; background-color: #f9fafb;">
        <h1 style="color: #2563eb; font-size: 24px; margin-bottom: 5px;">Ava Wilson</h1>
        <p style="color: #4b5563; margin-top: 0;">Data Scientist</p>
        <div style="margin: 20px 0; height: 2px; background: #e5e7eb;"></div>
        
        <h2 style="color: #2563eb; font-size: 18px;">Skills</h2>
        <ul style="padding-left: 20px; color: #475569;">
          <li>Python, R, TensorFlow, Scikit-Learn</li>
          <li>Data Analysis, Machine Learning, Predictive Modeling</li>
        </ul>
  
        <h2 style="color: #2563eb; font-size: 18px;">Experience</h2>
        <div style="margin-bottom: 10px;">
          <h3 style="font-size: 16px;">XYZ Tech - Senior Data Scientist</h3>
          <p style="color: #4b5563;">2021 - Present</p>
          <p>Developed machine learning models that increased customer retention by 25%.</p>
        </div>
        <div style="margin-bottom: 10px;">
          <h3 style="font-size: 16px;">ABC Corp - Data Analyst</h3>
          <p style="color: #4b5563;">2019 - 2021</p>
          <p>Analyzed large datasets to identify market trends and business insights.</p>
        </div>
  
        <h2 style="color: #2563eb; font-size: 18px;">Education</h2>
        <p>Bachelor of Science in Data Science – Stanford University (2018)</p>
      </div>
    `,
    type: "system",
    timeStamp: "05th Sep 2025",
    stars: 45,
  }
];


export function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

export const MapResumeDataToFormData = (resumeData: any): FormData => {
  return {
    fullName: resumeData.fullName || "",
    email: resumeData.email || "",
    phoneNumber: resumeData.phoneNumber || "",
    workingProfession: resumeData.workingProfession || "",
    careerSummary: resumeData.careerSummary || "",
    resumeName: resumeData.templateName || "",
    skills: resumeData.skills || [],

    experience: resumeData.experience?.map((exp: any) => ({
      jobTitle: exp.jobTitle || "",
      companyName: exp.companyName || "",
      duration: exp.duration || "",
    })) || [],

    education: resumeData.education?.map((edu: any) => ({
      degree: edu.degree || "",
      university: edu.boards || "",
      graduationYear: edu.graduatedYear || "",
    })) || [],

    projects: resumeData.projects?.map((project: any) => ({
      name: project.title || "",
      technologies: project.techStack || "",
      description: project.description || "",
      deployedLink: project.link || "",
    })) || [],

    certification: resumeData.certifications?.map((cert: any) => ({
      name: cert.name || "",
      issuedBy: cert.issuer || "",
      issueDate: cert.dateIssued || "",
      deployedLink: cert.deployedUrl || "",
    })) || [],
  };
};


export const CountryDialCodes = [
  {
    name: "Afghanistan",
    dial_code: "+93",
    code: "AF",
  },
  {
    name: "Aland Islands",
    dial_code: "+358",
    code: "AX",
  },
  {
    name: "Albania",
    dial_code: "+355",
    code: "AL",
  },
  {
    name: "Algeria",
    dial_code: "+213",
    code: "DZ",
  },
  {
    name: "AmericanSamoa",
    dial_code: "+1684",
    code: "AS",
  },
  {
    name: "Andorra",
    dial_code: "+376",
    code: "AD",
  },
  {
    name: "Angola",
    dial_code: "+244",
    code: "AO",
  },
  {
    name: "Anguilla",
    dial_code: "+1264",
    code: "AI",
  },
  {
    name: "Antarctica",
    dial_code: "+672",
    code: "AQ",
  },
  {
    name: "Antigua and Barbuda",
    dial_code: "+1268",
    code: "AG",
  },
  {
    name: "Argentina",
    dial_code: "+54",
    code: "AR",
  },
  {
    name: "Armenia",
    dial_code: "+374",
    code: "AM",
  },
  {
    name: "Aruba",
    dial_code: "+297",
    code: "AW",
  },
  {
    name: "Australia",
    dial_code: "+61",
    code: "AU",
  },
  {
    name: "Austria",
    dial_code: "+43",
    code: "AT",
  },
  {
    name: "Azerbaijan",
    dial_code: "+994",
    code: "AZ",
  },
  {
    name: "Bahamas",
    dial_code: "+1242",
    code: "BS",
  },
  {
    name: "Bahrain",
    dial_code: "+973",
    code: "BH",
  },
  {
    name: "Bangladesh",
    dial_code: "+880",
    code: "BD",
  },
  {
    name: "Barbados",
    dial_code: "+1246",
    code: "BB",
  },
  {
    name: "Belarus",
    dial_code: "+375",
    code: "BY",
  },
  {
    name: "Belgium",
    dial_code: "+32",
    code: "BE",
  },
  {
    name: "Belize",
    dial_code: "+501",
    code: "BZ",
  },
  {
    name: "Benin",
    dial_code: "+229",
    code: "BJ",
  },
  {
    name: "Bermuda",
    dial_code: "+1441",
    code: "BM",
  },
  {
    name: "Bhutan",
    dial_code: "+975",
    code: "BT",
  },
  {
    name: "Bolivia, Plurinational State of",
    dial_code: "+591",
    code: "BO",
  },
  {
    name: "Bosnia and Herzegovina",
    dial_code: "+387",
    code: "BA",
  },
  {
    name: "Botswana",
    dial_code: "+267",
    code: "BW",
  },
  {
    name: "Brazil",
    dial_code: "+55",
    code: "BR",
  },
  {
    name: "British Indian Ocean Territory",
    dial_code: "+246",
    code: "IO",
  },
  {
    name: "Brunei Darussalam",
    dial_code: "+673",
    code: "BN",
  },
  {
    name: "Bulgaria",
    dial_code: "+359",
    code: "BG",
  },
  {
    name: "Burkina Faso",
    dial_code: "+226",
    code: "BF",
  },
  {
    name: "Burundi",
    dial_code: "+257",
    code: "BI",
  },
  {
    name: "Cambodia",
    dial_code: "+855",
    code: "KH",
  },
  {
    name: "Cameroon",
    dial_code: "+237",
    code: "CM",
  },
  {
    name: "Canada",
    dial_code: "+1",
    code: "CA",
  },
  {
    name: "Cape Verde",
    dial_code: "+238",
    code: "CV",
  },
  {
    name: "Cayman Islands",
    dial_code: "+ 345",
    code: "KY",
  },
  {
    name: "Central African Republic",
    dial_code: "+236",
    code: "CF",
  },
  {
    name: "Chad",
    dial_code: "+235",
    code: "TD",
  },
  {
    name: "Chile",
    dial_code: "+56",
    code: "CL",
  },
  {
    name: "China",
    dial_code: "+86",
    code: "CN",
  },
  {
    name: "Christmas Island",
    dial_code: "+61",
    code: "CX",
  },
  {
    name: "Cocos (Keeling) Islands",
    dial_code: "+61",
    code: "CC",
  },
  {
    name: "Colombia",
    dial_code: "+57",
    code: "CO",
  },
  {
    name: "Comoros",
    dial_code: "+269",
    code: "KM",
  },
  {
    name: "Congo",
    dial_code: "+242",
    code: "CG",
  },
  {
    name: "Congo, The Democratic Republic of the Congo",
    dial_code: "+243",
    code: "CD",
  },
  {
    name: "Cook Islands",
    dial_code: "+682",
    code: "CK",
  },
  {
    name: "Costa Rica",
    dial_code: "+506",
    code: "CR",
  },
  {
    name: "Cote d'Ivoire",
    dial_code: "+225",
    code: "CI",
  },
  {
    name: "Croatia",
    dial_code: "+385",
    code: "HR",
  },
  {
    name: "Cuba",
    dial_code: "+53",
    code: "CU",
  },
  {
    name: "Cyprus",
    dial_code: "+357",
    code: "CY",
  },
  {
    name: "Czech Republic",
    dial_code: "+420",
    code: "CZ",
  },
  {
    name: "Denmark",
    dial_code: "+45",
    code: "DK",
  },
  {
    name: "Djibouti",
    dial_code: "+253",
    code: "DJ",
  },
  {
    name: "Dominica",
    dial_code: "+1767",
    code: "DM",
  },
  {
    name: "Dominican Republic",
    dial_code: "+1849",
    code: "DO",
  },
  {
    name: "Ecuador",
    dial_code: "+593",
    code: "EC",
  },
  {
    name: "Egypt",
    dial_code: "+20",
    code: "EG",
  },
  {
    name: "El Salvador",
    dial_code: "+503",
    code: "SV",
  },
  {
    name: "Equatorial Guinea",
    dial_code: "+240",
    code: "GQ",
  },
  {
    name: "Eritrea",
    dial_code: "+291",
    code: "ER",
  },
  {
    name: "Estonia",
    dial_code: "+372",
    code: "EE",
  },
  {
    name: "Ethiopia",
    dial_code: "+251",
    code: "ET",
  },
  {
    name: "Falkland Islands (Malvinas)",
    dial_code: "+500",
    code: "FK",
  },
  {
    name: "Faroe Islands",
    dial_code: "+298",
    code: "FO",
  },
  {
    name: "Fiji",
    dial_code: "+679",
    code: "FJ",
  },
  {
    name: "Finland",
    dial_code: "+358",
    code: "FI",
  },
  {
    name: "France",
    dial_code: "+33",
    code: "FR",
  },
  {
    name: "French Guiana",
    dial_code: "+594",
    code: "GF",
  },
  {
    name: "French Polynesia",
    dial_code: "+689",
    code: "PF",
  },
  {
    name: "Gabon",
    dial_code: "+241",
    code: "GA",
  },
  {
    name: "Gambia",
    dial_code: "+220",
    code: "GM",
  },
  {
    name: "Georgia",
    dial_code: "+995",
    code: "GE",
  },
  {
    name: "Germany",
    dial_code: "+49",
    code: "DE",
  },
  {
    name: "Ghana",
    dial_code: "+233",
    code: "GH",
  },
  {
    name: "Gibraltar",
    dial_code: "+350",
    code: "GI",
  },
  {
    name: "Greece",
    dial_code: "+30",
    code: "GR",
  },
  {
    name: "Greenland",
    dial_code: "+299",
    code: "GL",
  },
  {
    name: "Grenada",
    dial_code: "+1473",
    code: "GD",
  },
  {
    name: "Guadeloupe",
    dial_code: "+590",
    code: "GP",
  },
  {
    name: "Guam",
    dial_code: "+1671",
    code: "GU",
  },
  {
    name: "Guatemala",
    dial_code: "+502",
    code: "GT",
  },
  {
    name: "Guernsey",
    dial_code: "+44",
    code: "GG",
  },
  {
    name: "Guinea",
    dial_code: "+224",
    code: "GN",
  },
  {
    name: "Guinea-Bissau",
    dial_code: "+245",
    code: "GW",
  },
  {
    name: "Guyana",
    dial_code: "+595",
    code: "GY",
  },
  {
    name: "Haiti",
    dial_code: "+509",
    code: "HT",
  },
  {
    name: "Holy See (Vatican City State)",
    dial_code: "+379",
    code: "VA",
  },
  {
    name: "Honduras",
    dial_code: "+504",
    code: "HN",
  },
  {
    name: "Hong Kong",
    dial_code: "+852",
    code: "HK",
  },
  {
    name: "Hungary",
    dial_code: "+36",
    code: "HU",
  },
  {
    name: "Iceland",
    dial_code: "+354",
    code: "IS",
  },
  {
    name: "India",
    dial_code: "+91",
    code: "IN",
  },
  {
    name: "Indonesia",
    dial_code: "+62",
    code: "ID",
  },
  {
    name: "Iran, Islamic Republic of Persian Gulf",
    dial_code: "+98",
    code: "IR",
  },
  {
    name: "Iraq",
    dial_code: "+964",
    code: "IQ",
  },
  {
    name: "Ireland",
    dial_code: "+353",
    code: "IE",
  },
  {
    name: "Isle of Man",
    dial_code: "+44",
    code: "IM",
  },
  {
    name: "Israel",
    dial_code: "+972",
    code: "IL",
  },
  {
    name: "Italy",
    dial_code: "+39",
    code: "IT",
  },
  {
    name: "Jamaica",
    dial_code: "+1876",
    code: "JM",
  },
  {
    name: "Japan",
    dial_code: "+81",
    code: "JP",
  },
  {
    name: "Jersey",
    dial_code: "+44",
    code: "JE",
  },
  {
    name: "Jordan",
    dial_code: "+962",
    code: "JO",
  },
  {
    name: "Kazakhstan",
    dial_code: "+77",
    code: "KZ",
  },
  {
    name: "Kenya",
    dial_code: "+254",
    code: "KE",
  },
  {
    name: "Kiribati",
    dial_code: "+686",
    code: "KI",
  },
  {
    name: "Korea, Democratic People's Republic of Korea",
    dial_code: "+850",
    code: "KP",
  },
  {
    name: "Korea, Republic of South Korea",
    dial_code: "+82",
    code: "KR",
  },
  {
    name: "Kuwait",
    dial_code: "+965",
    code: "KW",
  },
  {
    name: "Kyrgyzstan",
    dial_code: "+996",
    code: "KG",
  },
  {
    name: "Laos",
    dial_code: "+856",
    code: "LA",
  },
  {
    name: "Latvia",
    dial_code: "+371",
    code: "LV",
  },
  {
    name: "Lebanon",
    dial_code: "+961",
    code: "LB",
  },
  {
    name: "Lesotho",
    dial_code: "+266",
    code: "LS",
  },
  {
    name: "Liberia",
    dial_code: "+231",
    code: "LR",
  },
  {
    name: "Libyan Arab Jamahiriya",
    dial_code: "+218",
    code: "LY",
  },
  {
    name: "Liechtenstein",
    dial_code: "+423",
    code: "LI",
  },
  {
    name: "Lithuania",
    dial_code: "+370",
    code: "LT",
  },
  {
    name: "Luxembourg",
    dial_code: "+352",
    code: "LU",
  },
  {
    name: "Macao",
    dial_code: "+853",
    code: "MO",
  },
  {
    name: "Macedonia",
    dial_code: "+389",
    code: "MK",
  },
  {
    name: "Madagascar",
    dial_code: "+261",
    code: "MG",
  },
  {
    name: "Malawi",
    dial_code: "+265",
    code: "MW",
  },
  {
    name: "Malaysia",
    dial_code: "+60",
    code: "MY",
  },
  {
    name: "Maldives",
    dial_code: "+960",
    code: "MV",
  },
  {
    name: "Mali",
    dial_code: "+223",
    code: "ML",
  },
  {
    name: "Malta",
    dial_code: "+356",
    code: "MT",
  },
  {
    name: "Marshall Islands",
    dial_code: "+692",
    code: "MH",
  },
  {
    name: "Martinique",
    dial_code: "+596",
    code: "MQ",
  },
  {
    name: "Mauritania",
    dial_code: "+222",
    code: "MR",
  },
  {
    name: "Mauritius",
    dial_code: "+230",
    code: "MU",
  },
  {
    name: "Mayotte",
    dial_code: "+262",
    code: "YT",
  },
  {
    name: "Mexico",
    dial_code: "+52",
    code: "MX",
  },
  {
    name: "Micronesia, Federated States of Micronesia",
    dial_code: "+691",
    code: "FM",
  },
  {
    name: "Moldova",
    dial_code: "+373",
    code: "MD",
  },
  {
    name: "Monaco",
    dial_code: "+377",
    code: "MC",
  },
  {
    name: "Mongolia",
    dial_code: "+976",
    code: "MN",
  },
  {
    name: "Montenegro",
    dial_code: "+382",
    code: "ME",
  },
  {
    name: "Montserrat",
    dial_code: "+1664",
    code: "MS",
  },
  {
    name: "Morocco",
    dial_code: "+212",
    code: "MA",
  },
  {
    name: "Mozambique",
    dial_code: "+258",
    code: "MZ",
  },
  {
    name: "Myanmar",
    dial_code: "+95",
    code: "MM",
  },
  {
    name: "Namibia",
    dial_code: "+264",
    code: "NA",
  },
  {
    name: "Nauru",
    dial_code: "+674",
    code: "NR",
  },
  {
    name: "Nepal",
    dial_code: "+977",
    code: "NP",
  },
  {
    name: "Netherlands",
    dial_code: "+31",
    code: "NL",
  },
  {
    name: "Netherlands Antilles",
    dial_code: "+599",
    code: "AN",
  },
  {
    name: "New Caledonia",
    dial_code: "+687",
    code: "NC",
  },
  {
    name: "New Zealand",
    dial_code: "+64",
    code: "NZ",
  },
  {
    name: "Nicaragua",
    dial_code: "+505",
    code: "NI",
  },
  {
    name: "Niger",
    dial_code: "+227",
    code: "NE",
  },
  {
    name: "Nigeria",
    dial_code: "+234",
    code: "NG",
  },
  {
    name: "Niue",
    dial_code: "+683",
    code: "NU",
  },
  {
    name: "Norfolk Island",
    dial_code: "+672",
    code: "NF",
  },
  {
    name: "Northern Mariana Islands",
    dial_code: "+1670",
    code: "MP",
  },
  {
    name: "Norway",
    dial_code: "+47",
    code: "NO",
  },
  {
    name: "Oman",
    dial_code: "+968",
    code: "OM",
  },
  {
    name: "Pakistan",
    dial_code: "+92",
    code: "PK",
  },
  {
    name: "Palau",
    dial_code: "+680",
    code: "PW",
  },
  {
    name: "Palestinian Territory, Occupied",
    dial_code: "+970",
    code: "PS",
  },
  {
    name: "Panama",
    dial_code: "+507",
    code: "PA",
  },
  {
    name: "Papua New Guinea",
    dial_code: "+675",
    code: "PG",
  },
  {
    name: "Paraguay",
    dial_code: "+595",
    code: "PY",
  },
  {
    name: "Peru",
    dial_code: "+51",
    code: "PE",
  },
  {
    name: "Philippines",
    dial_code: "+63",
    code: "PH",
  },
  {
    name: "Pitcairn",
    dial_code: "+872",
    code: "PN",
  },
  {
    name: "Poland",
    dial_code: "+48",
    code: "PL",
  },
  {
    name: "Portugal",
    dial_code: "+351",
    code: "PT",
  },
  {
    name: "Puerto Rico",
    dial_code: "+1939",
    code: "PR",
  },
  {
    name: "Qatar",
    dial_code: "+974",
    code: "QA",
  },
  {
    name: "Romania",
    dial_code: "+40",
    code: "RO",
  },
  {
    name: "Russia",
    dial_code: "+7",
    code: "RU",
  },
  {
    name: "Rwanda",
    dial_code: "+250",
    code: "RW",
  },
  {
    name: "Reunion",
    dial_code: "+262",
    code: "RE",
  },
  {
    name: "Saint Barthelemy",
    dial_code: "+590",
    code: "BL",
  },
  {
    name: "Saint Helena, Ascension and Tristan Da Cunha",
    dial_code: "+290",
    code: "SH",
  },
  {
    name: "Saint Kitts and Nevis",
    dial_code: "+1869",
    code: "KN",
  },
  {
    name: "Saint Lucia",
    dial_code: "+1758",
    code: "LC",
  },
  {
    name: "Saint Martin",
    dial_code: "+590",
    code: "MF",
  },
  {
    name: "Saint Pierre and Miquelon",
    dial_code: "+508",
    code: "PM",
  },
  {
    name: "Saint Vincent and the Grenadines",
    dial_code: "+1784",
    code: "VC",
  },
  {
    name: "Samoa",
    dial_code: "+685",
    code: "WS",
  },
  {
    name: "San Marino",
    dial_code: "+378",
    code: "SM",
  },
  {
    name: "Sao Tome and Principe",
    dial_code: "+239",
    code: "ST",
  },
  {
    name: "Saudi Arabia",
    dial_code: "+966",
    code: "SA",
  },
  {
    name: "Senegal",
    dial_code: "+221",
    code: "SN",
  },
  {
    name: "Serbia",
    dial_code: "+381",
    code: "RS",
  },
  {
    name: "Seychelles",
    dial_code: "+248",
    code: "SC",
  },
  {
    name: "Sierra Leone",
    dial_code: "+232",
    code: "SL",
  },
  {
    name: "Singapore",
    dial_code: "+65",
    code: "SG",
  },
  {
    name: "Slovakia",
    dial_code: "+421",
    code: "SK",
  },
  {
    name: "Slovenia",
    dial_code: "+386",
    code: "SI",
  },
  {
    name: "Solomon Islands",
    dial_code: "+677",
    code: "SB",
  },
  {
    name: "Somalia",
    dial_code: "+252",
    code: "SO",
  },
  {
    name: "South Africa",
    dial_code: "+27",
    code: "ZA",
  },
  {
    name: "South Sudan",
    dial_code: "+211",
    code: "SS",
  },
  {
    name: "South Georgia and the South Sandwich Islands",
    dial_code: "+500",
    code: "GS",
  },
  {
    name: "Spain",
    dial_code: "+34",
    code: "ES",
  },
  {
    name: "Sri Lanka",
    dial_code: "+94",
    code: "LK",
  },
  {
    name: "Sudan",
    dial_code: "+249",
    code: "SD",
  },
  {
    name: "Suriname",
    dial_code: "+597",
    code: "SR",
  },
  {
    name: "Svalbard and Jan Mayen",
    dial_code: "+47",
    code: "SJ",
  },
  {
    name: "Swaziland",
    dial_code: "+268",
    code: "SZ",
  },
  {
    name: "Sweden",
    dial_code: "+46",
    code: "SE",
  },
  {
    name: "Switzerland",
    dial_code: "+41",
    code: "CH",
  },
  {
    name: "Syrian Arab Republic",
    dial_code: "+963",
    code: "SY",
  },
  {
    name: "Taiwan",
    dial_code: "+886",
    code: "TW",
  },
  {
    name: "Tajikistan",
    dial_code: "+992",
    code: "TJ",
  },
  {
    name: "Tanzania, United Republic of Tanzania",
    dial_code: "+255",
    code: "TZ",
  },
  {
    name: "Thailand",
    dial_code: "+66",
    code: "TH",
  },
  {
    name: "Timor-Leste",
    dial_code: "+670",
    code: "TL",
  },
  {
    name: "Togo",
    dial_code: "+228",
    code: "TG",
  },
  {
    name: "Tokelau",
    dial_code: "+690",
    code: "TK",
  },
  {
    name: "Tonga",
    dial_code: "+676",
    code: "TO",
  },
  {
    name: "Trinidad and Tobago",
    dial_code: "+1868",
    code: "TT",
  },
  {
    name: "Tunisia",
    dial_code: "+216",
    code: "TN",
  },
  {
    name: "Turkey",
    dial_code: "+90",
    code: "TR",
  },
  {
    name: "Turkmenistan",
    dial_code: "+993",
    code: "TM",
  },
  {
    name: "Turks and Caicos Islands",
    dial_code: "+1649",
    code: "TC",
  },
  {
    name: "Tuvalu",
    dial_code: "+688",
    code: "TV",
  },
  {
    name: "Uganda",
    dial_code: "+256",
    code: "UG",
  },
  {
    name: "Ukraine",
    dial_code: "+380",
    code: "UA",
  },
  {
    name: "United Arab Emirates",
    dial_code: "+971",
    code: "AE",
  },
  {
    name: "United Kingdom",
    dial_code: "+44",
    code: "GB",
  },
  {
    name: "United States",
    dial_code: "+1",
    code: "US",
  },
  {
    name: "Uruguay",
    dial_code: "+598",
    code: "UY",
  },
  {
    name: "Uzbekistan",
    dial_code: "+998",
    code: "UZ",
  },
  {
    name: "Vanuatu",
    dial_code: "+678",
    code: "VU",
  },
  {
    name: "Venezuela, Bolivarian Republic of Venezuela",
    dial_code: "+58",
    code: "VE",
  },
  {
    name: "Vietnam",
    dial_code: "+84",
    code: "VN",
  },
  {
    name: "Virgin Islands, British",
    dial_code: "+1284",
    code: "VG",
  },
  {
    name: "Virgin Islands, U.S.",
    dial_code: "+1340",
    code: "VI",
  },
  {
    name: "Wallis and Futuna",
    dial_code: "+681",
    code: "WF",
  },
  {
    name: "Yemen",
    dial_code: "+967",
    code: "YE",
  },
  {
    name: "Zambia",
    dial_code: "+260",
    code: "ZM",
  },
  {
    name: "Zimbabwe",
    dial_code: "+263",
    code: "ZW",
  },
];

// used for time ages
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Now"; 
  }

  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`; 
  }

  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`; 
  }

  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days !== 1 ? "s" : ""} ago`; 
  }

  // ✅ More than a week → Format as '15 March 2025'
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const ProfessionalTitleList = [
  "Academic librarian",
  "Accountant",
  "Accounting technician",
  "Actuary",
  "Adult nurse",
  "Advertising account executive",
  "Advertising account planner",
  "Advertising copywriter",
  "Advice worker",
  "Advocate (Scotland)",
  "Aeronautical engineer",
  "Agricultural consultant",
  "Agricultural manager",
  "Aid worker/humanitarian worker",
  "Air traffic controller",
  "Airline cabin crew",
  "Amenity horticulturist",
  "Analytical chemist",
  "Animal nutritionist",
  "Animator",
  "Archaeologist",
  "Architect",
  "Architectural technologist",
  "Archivist",
  "Armed forces officer",
  "Aromatherapist",
  "Art therapist",
  "Arts administrator",
  "Auditor",
  "Automotive engineer",
  "Barrister",
  "Barrister’s clerk",
  "Bilingual secretary",
  "Biomedical engineer",
  "Biomedical scientist",
  "Biotechnologist",
  "Brand manager",
  "Broadcasting presenter",
  "Building control officer/surveyor",
  "Building services engineer",
  "Building surveyor",
  "Camera operator",
  "Careers adviser (higher education)",
  "Careers adviser",
  "Careers consultant",
  "Cartographer",
  "Catering manager",
  "Charities administrator",
  "Charities fundraiser",
  "Chemical (process) engineer",
  "Child psychotherapist",
  "Children's nurse",
  "Chiropractor",
  "Civil engineer",
  "Civil Service administrator",
  "Clinical biochemist",
  "Clinical cytogeneticist",
  "Clinical microbiologist",
  "Clinical molecular geneticist",
  "Clinical research associate",
  "Clinical scientist - tissue typing",
  "Clothing and textile technologist",
  "Colour technologist",
  "Commercial horticulturist",
  "Commercial/residential/rural surveyor",
  "Commissioning editor",
  "Commissioning engineer",
  "Commodity broker",
  "Communications engineer",
  "Community arts worker",
  "Community education officer",
  "Community worker",
  "Company secretary",
  "Computer sales support",
  "Computer scientist",
  "Conference organiser",
  "Consultant",
  "Consumer rights adviser",
  "Control and instrumentation engineer",
  "Corporate banker",
  "Corporate treasurer",
  "Counsellor",
  "Courier/tour guide",
  "Court reporter/verbatim reporter",
  "Credit analyst",
  "Crown Prosecution Service lawyer",
  "Crystallographer",
  "Curator",
  "Customs officer",
  "Cyber security specialist",
  "Dance movement therapist",
  "Data analyst",
  "Data scientist",
  "Data visualisation analyst",
  "Database administrator",
  "Debt/finance adviser",
  "Dental hygienist",
  "Dentist",
  "Design engineer",
  "Dietitian",
  "Diplomatic service",
  "Doctor (general practitioner, GP)",
  "Doctor (hospital)",
  "Dramatherapist",
  "Economist",
  "Editorial assistant",
  "Education administrator",
  "Electrical engineer",
  "Electronics engineer",
  "Employment advice worker",
  "Energy conservation officer",
  "Engineering geologist",
  "Environmental education officer",
  "Environmental health officer",
  "Environmental manager",
  "Environmental scientist",
  "Equal opportunities officer",
  "Equality and diversity officer",
  "Ergonomist",
  "Estate agent",
  "European Commission administrators",
  "Exhibition display designer",
  "Exhibition organiser",
  "Exploration geologist",
  "Facilities manager",
  "Field trials officer",
  "Financial manager",
  "Firefighter",
  "Fisheries officer",
  "Fitness centre manager",
  "Food scientist",
  "Food technologist",
  "Forensic scientist",
  "Geneticist",
  "Geographical information systems manager",
  "Geomatics/land surveyor",
  "Government lawyer",
  "Government research officer",
  "Graphic designer",
  "Health and safety adviser",
  "Health and safety inspector",
  "Health promotion specialist",
  "Health service manager",
  "Health visitor",
  "Herbalist",
  "Heritage manager",
  "Higher education administrator",
  "Higher education advice worker",
  "Homeless worker",
  "Horticultural consultant",
  "Hotel manager",
  "Housing adviser",
  "Human resources officer",
  "Hydrologist",
  "Illustrator",
  "Immigration officer",
  "Immunologist",
  "Industrial/product designer",
  "Information scientist",
  "Information systems manager",
  "Information technology/software trainers",
  "Insurance broker",
  "Insurance claims inspector",
  "Insurance risk surveyor",
  "Insurance underwriter",
  "Interpreter",
  "Investment analyst",
  "Investment banker - corporate finance",
  "Investment banker – operations",
  "Investment fund manager",
  "IT consultant",
  "IT support analyst",
  "Journalist",
  "Laboratory technician",
  "Land-based engineer",
  "Landscape architect",
  "Learning disability nurse",
  "Learning mentor",
  "Lecturer (adult education)",
  "Lecturer (further education)",
  "Lecturer (higher education)",
  "Legal executive",
  "Leisure centre manager",
  "Licensed conveyancer",
  "Local government administrator",
  "Local government lawyer",
  "Logistics/distribution manager",
  "Magazine features editor",
  "Magazine journalist",
  "Maintenance engineer",
  "Management accountant",
  "Manufacturing engineer",
  "Manufacturing machine operator",
  "Manufacturing toolmaker",
  "Marine scientist",
  "Market research analyst",
  "Market research executive",
  "Marketing account manager",
  "Marketing assistant",
  "Marketing executive",
  "Marketing manager (social media)",
  "Materials engineer",
  "Materials specialist",
  "Mechanical engineer",
  "Media analyst",
  "Media buyer",
  "Media planner",
  "Medical physicist",
  "Medical representative",
  "Mental health nurse",
  "Metallurgist",
  "Meteorologist",
  "Microbiologist",
  "Midwife",
  "Mining engineer",
  "Mobile developer",
  "Multimedia programmer",
  "Multimedia specialists",
  "Museum education officer",
  "Museum/gallery exhibition officer",
  "Music therapist",
  "Nanoscientist",
  "Nature conservation officer",
  "Naval architect",
  "Network administrator",
  "Nurse",
  "Nutritional therapist",
  "Nutritionist",
  "Occupational therapist",
  "Oceanographer",
  "Office manager",
  "Operational researcher",
  "Orthoptist",
  "Outdoor pursuits manager",
  "Packaging technologist",
  "Paediatric nurse",
  "Paramedic",
  "Patent attorney",
  "Patent examiner",
  "Pension scheme manager",
  "Personal assistant",
  "Petroleum engineer",
  "Pharmacist",
  "Pharmacologist",
  "Pharmacovigilance officer",
  "Photographer",
  "Physiotherapist",
  "Picture researcher",
  "Planning and development surveyor",
  "Planning technician",
  "Plant breeder",
  "Police officer",
  "Political party agent",
  "Political party research officer",
  "Practice nurse",
  "Press photographer",
  "Press sub-editor",
  "Prison officer",
  "Private music teacher",
  "Probation officer",
  "Product development scientist",
  "Production manager",
  "Programme researcher",
  "Project manager",
  "Psychologist (clinical)",
  "Psychologist (educational)",
  "Psychotherapist",
  "Public affairs consultant (lobbyist)",
  "Public affairs consultant (research)",
  "Public house manager",
  "Public librarian",
  "Public relations (PR) officer",
  "QA analyst",
  "Quality assurance manager",
  "Quantity surveyor",
  "Records manager",
  "Recruitment consultant",
  "Recycling officer",
  "Regulatory affairs officer",
  "Research chemist",
  "Research scientist",
  "Restaurant manager",
  "Retail banker",
  "Retail buyer",
  "Retail manager",
  "Retail merchandiser",
  "Retail pharmacist",
  "Sales executive",
  "Sales manager",
  "Scene of crime officer",
  "Secretary",
  "Seismic interpreter",
  "Site engineer",
  "Site manager",
  "Social researcher",
  "Social worker",
  "Software developer",
  "Soil scientist",
  "Solicitor",
  "Speech and language therapist",
  "Sports coach",
  "Sports development officer",
  "Sports therapist",
  "Statistician",
  "Stockbroker",
  "Structural engineer",
  "Systems analyst",
  "Systems developer",
  "Tax inspector",
  "Teacher (nursery/early years)",
  "Teacher (primary)",
  "Teacher (secondary)",
  "Teacher (special educational needs)",
  "Teaching/classroom assistant",
  "Technical author",
  "Technical sales engineer",
  "TEFL/TESL teacher",
  "Television production assistant",
  "Test automation developer",
  "Tour operator",
  "Tourism officer",
  "Tourist information manager",
  "Town and country planner",
  "Toxicologist",
  "Trade union research officer",
  "Trader",
  "Trading standards officer",
  "Training and development officer",
  "Translator",
  "Transportation planner",
  "Travel agent",
  "TV/film/theatre set designer",
  "UX designer",
  "Validation engineer",
  "Veterinary nurse",
  "Veterinary surgeon",
  "Video game designer",
  "Video game developer",
  "Volunteer work organiser",
  "Warehouse manager",
  "Waste disposal officer",
  "Water conservation officer",
  "Water engineer",
  "Web designer",
  "Web developer",
  "Welfare rights adviser",
  "Writer",
  "Youth worker"
];