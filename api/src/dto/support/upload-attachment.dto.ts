import { z } from "zod";

export const uploadAttachmentSchema = z.object({
  supportId: z.string().uuid("Invalid support ID"),
});

export type UploadAttachmentSchemaType = z.infer<typeof uploadAttachmentSchema>;

// for file upload validation (to be used with multer)
export const attachmentValidation = {
  allowedMimeTypes: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "text/plain",
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  ],
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5,
};
