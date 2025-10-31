import { z } from "zod";
import { emailValidator, passwordValidator } from "@shared/lib/validators";

export const registerSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
  confirmPassword: passwordValidator,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
