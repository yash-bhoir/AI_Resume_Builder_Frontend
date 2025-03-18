import { RESUME_ENDPOINTS } from "@/lib/endpoints";
import { formatDate, MapResumeDataToFormData, truncateText } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { FaRegFileLines } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "../ui/button";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CiWarning } from "react-icons/ci";
import { FiTrash2 } from "react-icons/fi";

interface GenerateHistoryCardProps {
  title: string;
  date: string;
  resumeData: any;
  getAllResumes: () => void;
}

const GenerateHistoryCard = ({
  title,
  date,
  resumeData,
  getAllResumes,
}: GenerateHistoryCardProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);

  const handleEdit = () => {
    const formData = MapResumeDataToFormData(resumeData);
    const resumeId = resumeData?.id;
    navigate(`/generate/${resumeData.id}`, {
      state: { formData, resumeId },
    });
  };

  const handleView = () => {
    setIsPreviewModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${RESUME_ENDPOINTS.RESUME_DELETE_BY_ID}/${resumeData?.id}`
      );
      getAllResumes();
      toast.success(response.data.message);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to delete resume. Please try again.");
      console.error("Error deleting resume:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-[250px] h-[260px] group">
        <div className="w-full h-full rounded-md transition-all ease-in duration-150">
          <div className="flex items-center justify-center w-full h-[70%] bg-neutral-100 dark:bg-neutral-800 rounded-md overflow-hidden">
            <FaRegFileLines className="size-20 text-neutral-400 group-hover:text-indigo-500 transition-all ease-in duration-150 group-hover:scale-110" />
          </div>
          <div className="py-3 flex items-start justify-center w-full h-[30%]">
            <div className="w-full flex flex-col">
              <h1 className="text-md font-semibold group-hover:text-indigo-700 transition-all ease-in duration-200 dark:group-hover:text-indigo-400">
                {truncateText(title, 25)}
              </h1>
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                {formatDate(date)}
              </span>
            </div>
            <Popover>
              <PopoverTrigger>
                <BsThreeDotsVertical className="size-5 text-neutral-800 dark:text-neutral-300" />
              </PopoverTrigger>
              <PopoverContent
                side="top"
                className="w-[190px] flex flex-col items-start p-1 py-2"
              >
                <h1 className="text-neutral-800 dark:text-neutral-300 text-xs ml-1 mb-2 font-semibold">
                  Options
                </h1>
                <Button
                  variant={"ghost"}
                  className="w-full flex items-center justify-start text-sm gap-2 text-neutral-800 dark:text-neutral-300"
                  onClick={handleEdit}
                >
                  <BiSolidEditAlt className="size-4" /> Edit
                </Button>
                <Button
                  variant={"ghost"}
                  className="w-full flex items-center justify-start text-sm gap-2 text-neutral-800 dark:text-neutral-300"
                  onClick={handleView}
                >
                  <MdOutlineRemoveRedEye className="size-4" /> Preview
                </Button>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full flex items-center justify-start text-sm gap-2 mt-2"
                    >
                      <FiTrash2 className="size-4" /> Delete
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Delete {truncateText(resumeData.templateName, 30)}
                      </DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this resume? This action
                        cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                      <p className="text-red-500 text-sm border p-2 rounded-md border-red-500 bg-red-50 dark:bg-red-400/10 flex items-center gap-2">
                        <CiWarning className="size-6" />
                        Once deleted, you will not be able to recover this
                        resume.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={handleDelete}
                        disabled={loading}
                        className="text-white bg-red-500 hover:bg-red-600 w-full"
                      >
                        {loading ? "Deleting..." : "Confirm Delete"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
        <DialogContent className="max-w-4xl h-[90vh]">
          <DialogHeader>
            <DialogTitle>Preview Resume</DialogTitle>
          </DialogHeader>
          <div className="h-[80vh]">
            <iframe
              srcDoc={resumeData.jsonHtmlCode}
              title="Resume Preview"
              className="w-full h-full border rounded-md"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GenerateHistoryCard;
