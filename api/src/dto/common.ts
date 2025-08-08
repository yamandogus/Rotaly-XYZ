import { z } from "zod";

/**
 * Supported locales for the application
 */
export const SUPPORTED_LOCALES = ["en", "tr"] as const;

/**
 * Locale validation schema
 */
export const localeParamsSchema = z.object({
  locale: z.enum(SUPPORTED_LOCALES, {
    message: `Invalid locale. Supported locales are: ${SUPPORTED_LOCALES.join(
      ", "
    )}`,
  }),
});

export type LocaleParams = z.infer<typeof localeParamsSchema>;
