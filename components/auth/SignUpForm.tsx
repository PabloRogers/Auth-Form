"use client";
import EmailVerificationForm from "./EmailVerificationForm";
import { SubmitHandler } from "react-hook-form";
import {
  TAccountDetailsSchema,
  TSignupSchema,
  TVerifyEmailSchema,
  signupSchema,
} from "@/lib/zod/schema";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { toast } from "sonner";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";
import { useMultiStepForm } from "../useMultiStepForm";
import TestSignupStep1 from "./TestSignUpStep1";

export default function SignUpForm() {
  const { signUp, isLoaded, setActive } = useSignUp();

  const handleStep1: SubmitHandler<TSignupSchema> = async (data) => {
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

  const handleStep2: SubmitHandler<TAccountDetailsSchema> = async (data) => {
    if (!isLoaded) return;

    //Updates the sign-up process using the username and firstname and lastname provided
    try {
      await signUp.update({
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.info("Verification code sent to your email");
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

  const handlePasswordReset: SubmitHandler<TVerifyEmailSchema> = async (
    data
  ) => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.pin,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
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

  const { nextStep, backStep, step } = useMultiStepForm([
    <SignupStep1 key="step1" onSubmit={handleStep1} />,
    <SignupStep2 key="step3" onSubmit={handleStep2} />,
    <EmailVerificationForm key="step3" onSubmit={handlePasswordReset} />,
  ]);

  return step;
}
