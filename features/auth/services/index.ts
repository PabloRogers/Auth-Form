import { TSignupSchema, signupSchema } from "@/lib/zod/schema";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { SignUpResource } from "@clerk/types";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface TSignUpForm {
  data: SubmitHandler<TSignupSchema>;
  isLoaded: boolean;
  signUp: SignUpResource;
  nextStep: () => void;
}

export const handleEmailPassword: SubmitHandler<TSignUpForm> = async ({
  data,
  isLoaded,
  nextStep,
  signUp,
}) => {
  const { email, password } = signupSchema.parse(data);
  if (!isLoaded) return;

  // Start the sign-up process using the email and password provided
  try {
    await signUp.create({
      emailAddress: email,
      password: password,
    });

    nextStep();
  } catch (err: any) {
    if (isClerkAPIResponseError(err)) {
      switch (err.errors[0].code) {
        default:
          toast.error(err.errors[0]?.message);
          break;
      }
    } else {
      toast.error("An unexpected error occurred. Please try again.");
      console.log(err);
    }
  }
};
