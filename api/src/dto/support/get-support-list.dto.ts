import { z } from "zod";

export const GetSupportListSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  status: z.enum(["open", "closed", "all"]).default("all"),
  category: z.string().optional(),
});

export type GetSupportListDto = z.infer<typeof GetSupportListSchema>;
