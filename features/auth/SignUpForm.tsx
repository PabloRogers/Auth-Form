"use client";
import { EmailVerificationForm } from "@/features/auth/components/EmailVerificationForm";
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
import { SignupStep1 } from "@/features/auth/components/SignupStep1";
import { SignupStep2 } from "@/features/auth/components/SignupStep2";
import { useMultiStepForm } from "@/features/auth/hooks/useMultiStepForm";
import { FC } from "react";

interface SignUpFormProps {}

export const SignUpForm: FC<SignUpFormProps> = () => {
  const { signUp, isLoaded, setActive } = useSignUp();

  const handleEmailPassword: SubmitHandler<TSignupSchema> = async (data) => {
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

  const handleAccountInfo: SubmitHandler<TAccountDetailsSchema> = async (
    data
  ) => {
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

  const handleCompleteSignUp: SubmitHandler<TVerifyEmailSchema> = async (
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
    <SignupStep1 key="step1" onSubmit={handleEmailPassword} />,
    <SignupStep2 key="step2" onSubmit={handleAccountInfo} />,
    <EmailVerificationForm key="step3" onSubmit={handleCompleteSignUp} />,
  ]);

  return step;
};
