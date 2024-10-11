import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/features/auth/components/SignOutButton";
import { ThemeToggle } from "@/components/ThemeToggle";
export default async function Home() {
  const user = await currentUser();

  return (
    <div>
      <div>Hello {user?.primaryEmailAddress?.emailAddress}</div>
      <div>
        <SignOutButton />
      </div>
    </div>
  );
}
