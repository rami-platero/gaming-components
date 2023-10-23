import { z } from "zod";

export const reviewFormSchema = z.object({
  body: z
    .string()
    .nonempty("Review message is required")
    .min(20, "Review message must be at least 20 characters long.")
    .max(300, "Review message must not exceed 300 characters."),
});

export type ReviewFormSchema = z.infer<typeof reviewFormSchema>;
