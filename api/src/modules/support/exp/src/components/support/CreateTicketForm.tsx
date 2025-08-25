import React, { useState } from "react";
import { Button } from "../common/Button";
import { Input, TextArea, Select } from "../common/Input";
import { SupportCategory, CreateSupportRequest } from "../../types";
import SupportService from "../../services/supportService";

interface CreateTicketFormProps {
  onTicketCreated?: (ticket: any) => void;
  onCancel?: () => void;
}

export const CreateTicketForm: React.FC<CreateTicketFormProps> = ({
  onTicketCreated,
  onCancel,
}) => {
  const [formData, setFormData] = useState<CreateSupportRequest>({
    subject: "",
    body: "",
    category: SupportCategory.GENERAL,
  });
  const [errors, setErrors] = useState<Partial<CreateSupportRequest>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = [
    { value: SupportCategory.GENERAL, label: "General" },
    { value: SupportCategory.TECHNICAL, label: "Technical" },
    { value: SupportCategory.BILLING, label: "Billing" },
    { value: SupportCategory.RESERVATION, label: "Reservation" },
    { value: SupportCategory.COMPLAINT, label: "Complaint" },
    { value: SupportCategory.FEATURE_REQUEST, label: "Feature Request" },
    { value: SupportCategory.SECURITY, label: "Security" },
    { value: SupportCategory.OTHER, label: "Other" },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateSupportRequest> = {};

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.length > 200) {
      newErrors.subject = "Subject must be less than 200 characters";
    }

    if (!formData.body.trim()) {
      newErrors.body = "Message is required";
    } else if (formData.body.length > 2000) {
      newErrors.body = "Message must be less than 2000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const ticket = await SupportService.createSupportTicket(formData);
      onTicketCreated?.(ticket);

      // Reset form
      setFormData({
        subject: "",
        body: "",
        category: SupportCategory.GENERAL,
      });
    } catch (error) {
      console.error("Error creating ticket:", error);
      // Handle error (could add error state here)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof CreateSupportRequest,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Create Support Ticket
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Subject"
          value={formData.subject}
          onChange={(e) => handleInputChange("subject", e.target.value)}
          error={errors.subject}
          placeholder="Brief description of your issue"
          required
        />

        <Select
          label="Category"
          value={formData.category}
          onChange={(e) =>
            handleInputChange("category", e.target.value as SupportCategory)
          }
          options={categoryOptions}
          error={errors.category}
        />

        <TextArea
          label="Message"
          value={formData.body}
          onChange={(e) => handleInputChange("body", e.target.value)}
          error={errors.body}
          placeholder="Please describe your issue in detail..."
          rows={6}
          required
        />

        <div className="flex justify-end space-x-3">
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Create Ticket
          </Button>
        </div>
      </form>
    </div>
  );
};
