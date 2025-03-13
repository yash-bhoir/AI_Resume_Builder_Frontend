import GenerateChatView from "@/components/generate-resume/generate-chat-view";
import { BsPlus } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import GenerateHistoryCard from "@/components/generate-resume/generate-history-card";
import GenerateResumeFlow from "@/components/generate-resume/generate-resume-flow";
import { useState } from "react";

const mockHistory = [
  {
    id: 1,
    title: "Software Engineer Resume",
    date: "Updated now",
  },
  {
    id: 2,
    title: "Product Manager Resume",
    date: "2024-03-19",
  },
  {
    id: 3,
    title: "UX Designer Resume",
    date: "2024-03-18",
  },
  {
    id: 4,
    title: "Data Scientist Resume",
    date: "2024-03-17",
  },
];

export function GenerateResumePage(): JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <>
      <div className="container mt-8">
        {/* <div className="m-auto h-fit flex flex-col items-start w-full px-10 py-2">
          <h1 className="text-lg font-medium text-neutral-400">Overview</h1>
          <Button
            variant={"outline"}
            className="m-2 group flex flex-col w-[200px] h-[200px]"
            onClick={() => setModalOpen(true)}
          >
            <BsPlus className="size-20 text-neutral-500 group-hover:text-indigo-500" />
            <span className="text-md font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-indigo-500">
              Create New Resume
            </span>
          </Button>
        </div>
        <div className="m-auto h-fit flex flex-col items-start w-full px-12 py-2">
          <h1 className="text-lg font-medium text-neutral-400">
            Recent Generated Resumes
          </h1>

          <div className="flex flex-wrap w-full mt-3 gap-8">
            {mockHistory.map((history) => (
              <GenerateHistoryCard
                key={history.id}
                title={history.title}
                date={history.date}
              />
            ))}
          </div>
        </div> */}

        <GenerateChatView />
      </div>
      <GenerateResumeFlow
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
