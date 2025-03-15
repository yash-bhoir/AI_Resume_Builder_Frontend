import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LuMessageSquarePlus } from "react-icons/lu";
import { Textarea } from "../ui/textarea";
import axios, { AxiosError } from "axios"; // Import AxiosError
import { useState } from "react";
import { toast } from "sonner"; // Import toast from sonner
import { useUser } from "@clerk/clerk-react";

const UserFeedback = () => {
  const { user } = useUser();

  const [role, setRole] = useState(""); // State for role/designation
  const [content, setContent] = useState(""); // State for feedback content
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog open/close

  // Handle form submission
  const handleSubmit = async () => {
    if (!role || !content) {
      toast.error("Please fill out all fields."); // Use toast.error for errors
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the backend API to submit feedback
      const response = await axios.post("http://localhost:8080/api/v1/feedback/AddFeedback", {
        id: user?.id,
        role,
        content,
      });

      // Show success toast
      toast.success(response.data.message || "Feedback submitted successfully!"); // Use toast.success for success

      // Close the dialog
      setIsDialogOpen(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        // Show error toast for Axios errors
        toast.error(error.response?.data?.message || "Failed to submit feedback.");
      } else {
        // Handle non-Axios errors
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
      // Clear form fields
      setRole("");
      setContent("");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 justify-center">
          <LuMessageSquarePlus className="size-4" />
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Feedback</DialogTitle>
          <DialogDescription>
            Share your thoughts with us. We'd love to hear from you!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex flex-col items-start justify-center gap-2">
            <Label htmlFor="designation" className="text-right">
              Designation or Role
            </Label>
            <Input
              id="designation"
              placeholder="Enter your designation or role"
              className="col-span-3"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Your message</Label>
            <Textarea
              placeholder="Type your message here."
              className="h-[8rem] resize-none"
              id="message"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserFeedback;