import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";

export enum ValidationType {
  BODY = "body",
  PARAMS = "params",
  QUERY = "query",
}

export const validate = (
  schema: ZodSchema,
  type: ValidationType = ValidationType.BODY
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataToValidate = req[type];
      const validatedData = schema.parse(dataToValidate);

      // for query parameters, we need to handle assignment differently
      // because req.query is a getter-only property
      if (type === ValidationType.QUERY) {
        // override the getter with our validated data
        Object.defineProperty(req, "query", {
          value: validatedData,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      } else {
        req[type] = validatedData;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export const validateBody = (schema: ZodSchema) =>
  validate(schema, ValidationType.BODY);

export const validateParams = (schema: ZodSchema) =>
  validate(schema, ValidationType.PARAMS);

export const validateQuery = (schema: ZodSchema) =>
  validate(schema, ValidationType.QUERY);

export const validateId = validate(
  z.object({
    id: z.string().refine(
      (val) => {
        // allow AI assistant IDs that start with "ai-assistant"
        if (val.startsWith("ai-assistant")) {
          return true;
        }
        // otherwise, validate as UUID
        const uuidRegex =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(val);
      },
      {
        message: "Geçerli bir UUID formatı veya AI assistant ID gerekli",
      }
    ),
  }),
  ValidationType.PARAMS
);

// helper function to create a flexible ID schema that accepts both UUIDs and AI IDs
export const createFlexibleIdSchema = (fieldName: string = "id") => {
  return z.string().refine(
    (val) => {
      // allow AI assistant IDs that start with "ai-assistant"
      if (val.startsWith("ai-assistant")) {
        return true;
      }
      // otherwise, validate as UUID
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return uuidRegex.test(val);
    },
    {
      message: `${fieldName} must be a valid UUID or AI assistant ID`,
    }
  );
};
