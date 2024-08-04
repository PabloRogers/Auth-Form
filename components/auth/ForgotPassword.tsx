"use client";

import React, { ReactElement, useState } from "react";
import { useMultiStepForm } from "../useMultiStepForm";
import ForgotPasswordStep1 from "./ForgotPasswordStep1";
import EmailVerificationForm from "./EmailVerificationForm";
import ForgotPasswordStep3 from "./ForgotPasswordStep3";
import { SubmitHandler } from "react-hook-form";
import {
  TForgotPasswordEmailSchema,
  TForgotPasswordResetSchema,
  TVerifyEmailSchema,
  verifyEmailSchema,
} from "@/lib/zod/schema";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { toast } from "sonner";

export interface ForgotPasswordSchema {
  email: string;
  code: string;
  newPassword: string;
}

export default function TestForgotPassword() {
  const [datas, setDatas] = useState<ForgotPasswordSchema>({
    email: "",
    code: "",
    newPassword: "",
  });

  const { signIn, setActive } = useSignIn();

  // Send the password reset code to the user's email
  const handleSendEmailCode: SubmitHandler<TForgotPasswordEmailSchema> = async (
    data
  ) => {
    try {
      await signIn
        ?.create({
          strategy: "reset_password_email_code",
          identifier: data.email,
        })
        .then((_) => {
          // setSuccessfulCreation(true);
          toast.info("Verification code sent to your email.");
          nextStep();
        });
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        switch (err.errors[0].code) {
          case "form_conditional_param_value_disallowed":
            toast.error(
              "Account does not have password. Please sign in with OAuth."
            );
            break;
          default:
            toast.error(err.errors[0]?.message || "An error occurred");
            break;
        }
      } else {
        console.log(err);
      }
    }
  };

  // Verify the email code sent to the user
  const handleEmailVerification: SubmitHandler<TVerifyEmailSchema> = async (
    data
  ) => {
    try {
      verifyEmailSchema.safeParse(data);
      setDatas({ ...datas, code: data.pin });

      nextStep();
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        const errorMessage = err.errors[0]?.message || "An error occurred";
        toast.error(errorMessage);
      }
      console.error(JSON.stringify(err, null, 2));
      backStep();
    }
  };

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  const handlePasswordReset: SubmitHandler<TForgotPasswordResetSchema> = async (
    data
  ) => {
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: datas.code,
        password: data.newPassword,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === "needs_second_factor") {
          //   setSecondFactor(true);
        } else if (result.status === "complete") {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
        } else {
          console.log(result);
        }
        toast.success("Password successfully reset!");
      })
      .catch((err) => {
        if (isClerkAPIResponseError(err)) {
          if (err.errors[0].code === "form_code_incorrect") {
            const errorMessage =
              "The code you entered is incorrect. Please try again.";
            toast.error(errorMessage);
            backStep();
          } else if (err.errors[0].code === "form_password_pwned") {
            const errorMessage = err.errors[0]?.message || "An error occurred";
            toast.error(errorMessage);
            backStep();
          } else {
            const errorMessage = err.errors[0]?.message || "An error occurred";
            toast.error(errorMessage);
          }
        }
        console.error(JSON.stringify(err, null, 2));
      });
  };

  const { nextStep, backStep, step } = useMultiStepForm([
    <ForgotPasswordStep1 key="step1" onSubmit={handleSendEmailCode} />,
    <EmailVerificationForm key="step2" onSubmit={handleEmailVerification} />,
    <ForgotPasswordStep3 key="step3" onSubmit={handlePasswordReset} />,
  ]);
  return step;
}
