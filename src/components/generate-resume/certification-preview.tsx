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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateCertification = () => {
    let newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Certification name is required";
    } else if (formData.name.length < 10 || formData.name.length > 100) {
      newErrors.name =
        "Certification name must be between 10 to 100 characters";
    }

    if (!formData.issuedBy.trim()) {
      newErrors.issuedBy = "Issuer is required";
    } else if (formData.issuedBy.length < 4 || formData.issuedBy.length > 100) {
      newErrors.issuedBy = "Issuer must be between 4 to 100 characters";
    }

    if (!formData.issueDate.trim()) {
      newErrors.issueDate = "Issue date is required";
    }

    const isDuplicate = certifications.some(
      (cert) =>
        (cert.name.trim().toLowerCase() ===
          formData.name.trim().toLowerCase() &&
          cert.issuedBy.trim().toLowerCase() ===
            formData.issuedBy.trim().toLowerCase() &&
          cert.issueDate === formData.issueDate) ||
        (cert.name.trim().toLowerCase() ===
          formData.name.trim().toLowerCase() &&
          cert.issuedBy.trim().toLowerCase() ===
            formData.issuedBy.trim().toLowerCase()) ||
        cert.name.trim().toLowerCase() === formData.name.trim().toLowerCase()
    );

    if (isDuplicate) {
      newErrors.general = "Duplicate certification entry is not allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateCertification()) {
      onUpdateCertifications([...certifications, formData]);
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
      {certifications.length < 2 && (
        <Button onClick={() => setIsOpen(true)} variant="outline">
          Add Certification
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Certification</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Certification Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}

            <Input
              placeholder="Issued By"
              name="issuedBy"
              value={formData.issuedBy}
              onChange={handleChange}
            />
            {errors.issuedBy && (
              <span className="text-red-500 text-sm">{errors.issuedBy}</span>
            )}

            <Input
              type="date"
              placeholder="Issue Date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
            />
            {errors.issueDate && (
              <span className="text-red-500 text-sm">{errors.issueDate}</span>
            )}

            <Input
              placeholder="Deployed Link (optional)"
              name="deployedLink"
              value={formData.deployedLink || ""}
              onChange={handleChange}
            />

            {errors.general && (
              <span className="text-red-500 text-sm">{errors.general}</span>
            )}

            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>

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
