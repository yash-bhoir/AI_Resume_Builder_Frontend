import GenerateChatView from "@/components/generate-resume/generate-chat-view";
import { BsPlus } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import GenerateHistoryCard from "@/components/generate-resume/generate-history-card";
import GenerateResumeFlow from "@/components/generate-resume/generate-resume-flow";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { RESUME_ENDPOINTS } from "@/lib/endpoints";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import OverviewSkeleton from "@/components/common/skeleton-loading/overview-skeleton";

export function GenerateResumePage(): JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [resumes, setResumes] = useState<[]>([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchResumes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${RESUME_ENDPOINTS.RESUME_GET_ALL}/${user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResumes(response.data.resumes);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching resumes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <OverviewSkeleton />;
  }

  return (
    <>
      <div className="container mt-2">
        {location.pathname === "/generate" && (
          <>
            {resumes.length > 0 ? (
              <>
                <div className="m-auto h-fit flex flex-col items-start w-full px-10 py-2">
                  <h1 className="text-md font-medium text-neutral-600 dark:text-neutral-300">
                    Overview
                  </h1>
                  <Button
                    variant="outline"
                    className="m-2 group flex flex-col w-[200px] h-[200px] transition-all ease-in duration-150"
                    onClick={() => setModalOpen(true)}
                  >
                    <BsPlus className="size-20 text-neutral-500 group-hover:scale-110 group-hover:text-indigo-500" />
                    <span className="text-md font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-indigo-500">
                      Create New Resume
                    </span>
                  </Button>
                </div>

                <div className="m-auto h-fit flex flex-col items-start w-full px-12 py-2">
                  <h1 className="text-md font-medium text-neutral-600 dark:text-neutral-300">
                    Recent Generated Resumes
                  </h1>
                  <div className="flex flex-wrap w-full mt-3 gap-8">
                    {resumes &&
                      resumes.map((history: any) => (
                        <GenerateHistoryCard
                          key={history?.id}
                          title={history?.templateName}
                          date={history?.createdAt}
                          resumeData={history}
                          getAllResumes={fetchResumes}
                        />
                      ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="w-[550px] h-[80vh] text-center px-6 m-auto mt-8 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-neutral-700 dark:text-neutral-300 mb-3">
                  🚀 Kickstart Your Career Journey!
                </h1>
                <p className="text-md text-neutral-500 dark:text-neutral-400 mb-6">
                  Your resume is the key to unlocking amazing opportunities.
                  Take the first step today and create a professional resume in
                  minutes!
                </p>

                <Button
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-700 text-white hover:bg-indigo-400"
                  onClick={() => setModalOpen(true)}
                >
                  <BsPlus className="size-6" />
                  Start Creating Your First Resume
                </Button>
              </div>
            )}
          </>
        )}

        {id && <GenerateChatView />}
      </div>

      <GenerateResumeFlow
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
