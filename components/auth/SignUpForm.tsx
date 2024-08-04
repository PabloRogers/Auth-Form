"use client";

import { useState } from "react";

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
        const errorMessage = err.errors[0]?.message || "An error occurred";
        toast.error(errorMessage);
        // if (err.errors[0]?.code === "form_identifier_exists") {
        //   form.setError("email", {
        //     message: "Email already exists",
        //   });
        // }
      }
      console.error(JSON.stringify(err, null, 2));
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
        const errorMessage = err.errors[0]?.message || "An error occurred";
        toast.error(errorMessage);
        // if (err.errors[0]?.code === "form_identifier_exists") {
        //   form.setError("username", {
        //     message: "Username already exists",
        //   });
        // }
      }
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handlePasswordReset: SubmitHandler<TVerifyEmailSchema> = async (
    data
  ) => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
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
        const errorMessage = err.errors[0]?.message || "An error occurred";
        toast.error(errorMessage);
      }
      console.error(JSON.stringify(err, null, 2));
    }
  };
  const { nextStep, backStep, step } = useMultiStepForm([
    // <TestSignupStep1 />,
    <SignupStep1 onSubmit={handleStep1} />,
    <SignupStep2 onSubmit={handleStep2} />,
    <EmailVerificationForm onSubmit={handlePasswordReset} />,
  ]);

  return step;
}
