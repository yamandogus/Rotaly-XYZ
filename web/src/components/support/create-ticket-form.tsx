"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputField, TextAreaField, SelectField } from "./common/form-fields";
import { SupportCategory, CreateSupportRequest } from "@/types/support";
import { SupportService } from "@/services/supportService";
import { toast } from "react-hot-toast";

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
    { value: SupportCategory.GENERAL, label: "Genel" },
    { value: SupportCategory.TECHNICAL, label: "Teknik" },
    { value: SupportCategory.BILLING, label: "Faturalama" },
    { value: SupportCategory.RESERVATION, label: "Rezervasyon" },
    { value: SupportCategory.COMPLAINT, label: "Şikayet" },
    { value: SupportCategory.FEATURE_REQUEST, label: "Özellik Talebi" },
    { value: SupportCategory.SECURITY, label: "Güvenlik" },
    { value: SupportCategory.OTHER, label: "Diğer" },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateSupportRequest> = {};

    if (!formData.subject.trim()) {
      newErrors.subject = "Konu gereklidir";
    } else if (formData.subject.length > 200) {
      newErrors.subject = "Konu 200 karakterden az olmalıdır";
    }

    if (!formData.body.trim()) {
      newErrors.body = "Mesaj gereklidir";
    } else if (formData.body.length > 2000) {
      newErrors.body = "Mesaj 2000 karakterden az olmalıdır";
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
      toast.success("Destek bileti başarıyla oluşturuldu!");
      onTicketCreated?.(ticket);

      // Reset form
      setFormData({
        subject: "",
        body: "",
        category: SupportCategory.GENERAL,
      });
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error("Destek bileti oluşturulurken bir hata oluştu");
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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Destek Bileti Oluştur
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Konu"
            value={formData.subject}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("subject", e.target.value)
            }
            error={errors.subject}
            placeholder="Sorununuzun kısa açıklaması"
            required
          />

          <SelectField
            label="Kategori"
            value={formData.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleInputChange("category", e.target.value as SupportCategory)
            }
            options={categoryOptions}
            error={errors.category}
            required
          />

          <TextAreaField
            label="Mesaj"
            value={formData.body}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleInputChange("body", e.target.value)
            }
            error={errors.body}
            placeholder="Lütfen sorununuzu detaylı olarak açıklayın..."
            rows={6}
            required
          />

          <div className="flex justify-end space-x-3">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                İptal
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Oluşturuluyor..." : "Bileti Oluştur"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
