import { z } from "zod";

export const emailValidator = z.string().email("Invalid email");
export const passwordValidator = z.string().min(6, "Min 6 characters");
