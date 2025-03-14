import { Sidebar } from "../components/common/Sidebar";
import { GenerateResumePage } from "./generate-resume";
import CodeEditor from "./code-editor";
import AddTemplate from "./add-template";
import { Header } from "@/components/common/header";
import { Navigate, Route, Routes } from "react-router-dom";
import GenerateChatView from "@/components/generate-resume/generate-chat-view";

export function GenerateResumeContainer() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden max-w-7xl w-full mx-auto">
        <Sidebar/>
        <div className="flex-1 overflow-y-auto main_content_sidebar">
          <Routes>
            <Route index element={<GenerateResumePage />} />
            <Route path="code-editor" element={<CodeEditor />} />
            <Route path="add-template" element={<AddTemplate />} />
            <Route path=":id" element={<GenerateChatView />} />
            <Route path="*" element={<Navigate to="/generate" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default GenerateResumeContainer;
