import React from "react";
import SignInEmailPassword from "./SignInEmailPassword";
import { TLoginSchema } from "@/lib/zod/schema";
import { SubmitHandler } from "react-hook-form";
import { useSignIn } from "@clerk/nextjs";
import { toast } from "sonner";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

import { auth, clerkClient } from "@clerk/nextjs/server";

export default async function TestSignIn() {
  return null;
  //   return <SignInEmailPassword onSubmit={() => {}} />;
}
