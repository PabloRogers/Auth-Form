"use client";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  return (
    <Button
      onClick={async () => {
        await signOut({ redirectUrl: "/sign-in" });
        toast.success("Successfully signed out");
      }}
    >
      Sign Out
    </Button>
  );
};
