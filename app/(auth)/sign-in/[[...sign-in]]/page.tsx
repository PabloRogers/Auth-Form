import { SignInForm } from "@/features/auth/SignInForm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const user = await currentUser();

  if (user) {
    redirect("/");
  }
  return <SignInForm />;
}
