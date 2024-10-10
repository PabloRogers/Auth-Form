import { currentUser } from "@clerk/nextjs/server";
import { SignUpForm } from "@/features/auth/SignUpForm";
import { redirect } from "next/navigation";

export default async function Signup() {
  const user = await currentUser();

  if (user) {
    redirect("/");
  }
  return <SignUpForm />;
}
