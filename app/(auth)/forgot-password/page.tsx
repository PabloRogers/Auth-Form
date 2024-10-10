import React from "react";

import { ForgotPassword } from "@/features/auth/components/ForgotPassword";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await currentUser();

  if (user) {
    redirect("/");
  }

  return <ForgotPassword />;
}
