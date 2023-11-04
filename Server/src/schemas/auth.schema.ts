import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Email must be valid."),
  password: z.string().min(1, "Password is required."),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required.")
    .max(24, "Username must not exceed 24 characters.")
    .min(3, "Username must be at least 3 characters long."),
  email: z.string().min(1, "Email is required.").email("Email must be valid."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must be at least 8 characters long."),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().nonempty("This field is required"),
    newPassword: z
      .string()
      .nonempty("This field is required")
      .min(8, "Password must be at least 8 characters long."),
    repeatPassword: z.string().nonempty("This field is required"),
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: "Password doesn't match",
    path: ["repeatPassword"],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
