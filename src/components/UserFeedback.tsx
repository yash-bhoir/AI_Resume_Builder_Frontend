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
import { Textarea } from "./ui/textarea";

//WIP : Complete user feedback ui functionality + backend integration
//TODO : 1. Add user feedback form fields and validation
//TODO : 2. Add user feedback form submission functionality

const UserFeedback = () => {
  return (
    <Dialog>
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
            <Label htmlFor="name" className="text-right">
              Email Address
            </Label>
            <Input
              id="name"
              type="email"
              placeholder="Enter your email address"
              className="col-span-3"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <Label htmlFor="designation" className="text-right">
              Designation or Role
            </Label>
            <Input
              id="designation"
              placeholder="Enter your designation or role"
              className="col-span-3"
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Your message</Label>
            <Textarea placeholder="Type your message here." className="h-[8rem] resize-none" id="message" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserFeedback;
