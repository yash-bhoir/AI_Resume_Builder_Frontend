import { useState } from "react";
import { Sidebar } from "./history";
import { GenerateResumePage } from "./generate-resume";
import CodeEditor from "./codeEditor";
import AddTemplate from "./addTemplate";

const mockHistory = [
  {
    id: 1,
    title: "Software Engineer Resume",
    date: "2024-03-20",
    content: "Software engineer with 5 years...",
  },
  {
    id: 2,
    title: "Product Manager Resume",
    date: "2024-03-19",
    content: "Product manager with experience...",
  },
  {
    id: 3,
    title: "UX Designer Resume",
    date: "2024-03-18",
    content: "UX designer specialized in...",
  },
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
  const [currentPage, setCurrentPage] = useState("generate");

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleAddResumeClick = () => {
    setCurrentPage("codeEditor");
  };

  const handleGoToGenerate = () => {
    setCurrentPage("generate");
  };

  const handleAddTemplate = () => {
    setCurrentPage("AddTemplate");
  };

  return (
    <div className="flex h-[760px]">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={handleToggle}
        history={history}
        onAddResumeClick={handleAddResumeClick}
        OnAddTemplate ={handleAddTemplate}
      />
      <div className="flex-1 overflow-y-auto">
        {(() => {
          switch (currentPage) {
            case "codeEditor":
              return <CodeEditor onGoToGenerate={handleGoToGenerate} />;
            case "generate":
              return <GenerateResumePage />;
            case "AddTemplate":
              return <AddTemplate onGoToGenerate={handleGoToGenerate}/>;
            default:
              return <GenerateResumePage  />;
          }
        })()}
      </div>
    </div>
  );
}

export default GenerateResumeContainer;
