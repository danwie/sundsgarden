import { z } from "zod";

export const bookSchema = z.object({
  title: z
    .string({ error: "No book title, try again" })
    .min(1, "A book title can not be empty")
    .max(100, "The book title is too long (max 100 chars)"),
  genre: z.string().max(50, "Genre is too long (max 50 chars)").optional(),
  published_year: z
    .number({ error: "Year must be a number" }) // note a string "2026" is not accepted
    .int("Year must be an integer")
    .min(1000, "Year must be at least 1000")
    .max(2100, "Year must be less or equal to 2100")
    .optional(), // Not sure about this - I had it optional before so I'm keeping it this way
  author_id: z.number().int().optional(),
});

export type Book = z.infer<typeof bookSchema> & { id: number };

export const idSchema = z.object({
  id: z.coerce
    .number({ error: "id must be a number" })
    .int("id must be a integer")
    .positive("id must be positive"),
});

export const bookPatchSchema = bookSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: "At least one field must be sent.",
  });
