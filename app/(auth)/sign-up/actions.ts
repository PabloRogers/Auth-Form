"use server";
import { signupSchema } from "@/lib/zod/schema";
import { clerkClient } from "@clerk/nextjs/server";

export type FormState = {
  message: string;
  response: string;
};

export async function signupAction(formData: FormData): Promise<FormState> {
  "use server";

  try {
    const form = Object.fromEntries(formData);
    const parsed = signupSchema.safeParse(form);

    if (!parsed.success) {
      return { message: "Invalid form data", response: "" };
    }

    const response = await clerkClient.users.createUser({
      emailAddress: [parsed.data.email],
      password: parsed.data.password,
    });

    return { message: "Success", response: JSON.stringify(response) };
  } catch (error) {
    console.log(error);
    return { message: "Error", response: "" };
  }
}
