import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaTrash } from "react-icons/fa6";
import { truncateText } from "@/lib/utils";

interface Certification {
  name: string;
  issuedBy: string;
  issueDate: string;
  deployedLink?: string;
}

interface CertificationPreviewProps {
  certifications: Certification[];
  onUpdateCertifications: (newCertifications: Certification[]) => void;
}

const CertificationPreview = ({
  certifications,
  onUpdateCertifications,
}: CertificationPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState<Certification>({
    name: "",
    issuedBy: "",
    issueDate: "",
    deployedLink: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.issuedBy && formData.issueDate) {
      onUpdateCertifications([...certifications, formData]);

      // Clear form after submission
      setFormData({
        name: "",
        issuedBy: "",
        issueDate: "",
        deployedLink: "",
      });

      setIsOpen(false);
    }
  };

  const handleDelete = (index: number) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    onUpdateCertifications(updatedCertifications);
  };

  return (
    <div className="w-full flex flex-col gap-4 h-full">
      {/* Add Button */}

      {certifications.length < 2 && (
        <Button onClick={() => setIsOpen(true)} variant={"outline"}>
          Add Certification
        </Button>
      )}

      {/* Certification Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Certification</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            {/* Certification Name */}
            <Input
              placeholder="Certification Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {/* Issued By */}
            <Input
              placeholder="Issued By"
              name="issuedBy"
              value={formData.issuedBy}
              onChange={handleChange}
            />
            {/* Issue Date */}
            <Input
              type="date"
              placeholder="Issue Date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
            />
            {/* Deployed Link (Optional) */}
            <Input
              placeholder="Deployed Link (optional)"
              name="deployedLink"
              value={formData.deployedLink || ""}
              onChange={handleChange}
            />

            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Display Certifications */}
      {certifications.length > 0 && (
        <div className="flex flex-col items-start gap-3 border-t pt-4">
          {certifications.map((certification, index) => (
            <div
              key={index}
              className="w-full border p-1 px-2 rounded-md relative border-indigo-500"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-md font-semibold">
                    {truncateText(certification.name, 40)}
                  </h3>
                </div>
                <Button
                  onClick={() => handleDelete(index)}
                  variant="outline"
                  className="text-red-500 border-0"
                >
                  <FaTrash />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificationPreview;
