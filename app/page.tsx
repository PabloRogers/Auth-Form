import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";
import { ThemeToggle } from "@/components/ThemeToggle";
export default async function Home() {
  const user = await currentUser();

  return (
    <div>
      <div>Hello {user?.primaryEmailAddress?.emailAddress}</div>
      <div>
        <ThemeToggle />
        <SignOutButton />
      </div>
    </div>
  );
}
