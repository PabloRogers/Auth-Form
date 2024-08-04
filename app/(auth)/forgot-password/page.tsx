import React from "react";

import ForgotPassword from "@/components/auth/ForgotPassword";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function page() {
  const user = await currentUser();

  if (user) {
    redirect("/");
  }
  //   return <ForgotPassword />;
  return <ForgotPassword />;
}
