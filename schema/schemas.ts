import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
  .string()
  .min(8, { message: "Password have to contain at least 8 characters" }),
});

export const userSchema = z.object({
    username: z.string().min(1, { message: "First Name is required" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password have to contain at least 8 characters" }),
    passwordConfirmation: z
      .string()
      .min(8, { message: "Password Confirmation and password not match" }),
  });