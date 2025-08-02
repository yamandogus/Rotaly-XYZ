import { z } from "zod";

export const createMessageAttachmentSchema = z.object({
  messageId: z.string().uuid("Invalid message ID"),
});

export type CreateMessageAttachmentSchemaType = z.infer<
  typeof createMessageAttachmentSchema
>;

// for file upload validation (to be used with multer)
export const messageAttachmentValidation = {
  allowedMimeTypes: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5,
};
