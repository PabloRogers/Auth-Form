import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6),
});

type TLoginSchema = z.infer<typeof loginSchema>;

const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type TSignupSchema = z.infer<typeof signupSchema>;

export const verifyEmailSchema = z.object({
  pin: z
    .string()
    .min(6, { message: "Pin must be at least 6 characters long" })
    .max(6, { message: "Pin must be at most 6 characters long" }),
});

export type TVerifyEmailSchema = z.infer<typeof verifyEmailSchema>;

const accountDetailsSchema = z.object({
  username: z.string().min(3),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
});

type TAccountDetailsSchema = z.infer<typeof accountDetailsSchema>;

const forgotPasswordEmailSchema = z.object({
  email: z.string().email(),
});

type TForgotPasswordEmailSchema = z.infer<typeof forgotPasswordEmailSchema>;

const forgotPasswordResetSchema = z
  .object({
    newPassword: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type TForgotPasswordResetSchema = z.infer<typeof forgotPasswordResetSchema>;

export type {
  TLoginSchema,
  TSignupSchema,
  TAccountDetailsSchema,
  TForgotPasswordEmailSchema,
  TForgotPasswordResetSchema,
};
export {
  loginSchema,
  signupSchema,
  accountDetailsSchema,
  forgotPasswordEmailSchema,
  forgotPasswordResetSchema,
};
