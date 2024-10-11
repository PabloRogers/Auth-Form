import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@/features/auth/components/SignOutButton";

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
