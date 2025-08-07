import { z } from "zod";

//query params come as strings, so we need to transform them to integers

export const getSupportMessagesQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1)),
  // transform "page" query param to integer if there is a query param named "page"
  // otherwise default to 1 (integer)
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 20)),
  // transform "limit" query param to integer if there is a query param named "limit"
  // otherwise default to 20 (integer)
});

export type GetSupportMessagesQuerySchemaType = z.infer<
  typeof getSupportMessagesQuerySchema
>;
