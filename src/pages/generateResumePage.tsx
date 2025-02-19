import { useState } from "react";
import { Sidebar } from "./history";
import { GenerateResumePage } from "./generate-resume";

const mockHistory = [
  { id: 1, title: "Software Engineer Resume", date: "2024-03-20", content: "Software engineer with 5 years..." },
  { id: 2, title: "Product Manager Resume", date: "2024-03-19", content: "Product manager with experience..." },
  { id: 3, title: "UX Designer Resume", date: "2024-03-18", content: "UX designer specialized in..." }
];

type Resume = {
  id: number;
  title: string;
  date: string;
  content: string;
};

export function GenerateResumeContainer() {
  const [history] = useState<Resume[]>(mockHistory);
  const [isCollapsed, setIsCollapsed] = useState(false); 

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  return (
    <div className="flex h-[760px]"> 
      <Sidebar isCollapsed={isCollapsed} onToggle={handleToggle} history={history} />
      <div className="flex-1 overflow-y-auto"> 
        <GenerateResumePage />
      </div>
    </div>
  );
}

export default GenerateResumeContainer;