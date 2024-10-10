"use client";

import * as React from "react";
import { OAuthStrategy } from "@clerk/types";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { FC } from "react";

export interface GoogleOAuthProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const GoogleOAuth: FC<GoogleOAuthProps> = (props) => {
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  if (!signIn || !signUp) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sign-up/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  async function handleSignIn(strategy: OAuthStrategy) {
    try {
      if (!signIn || !signUp) return null;

      // If the user has an account in your application, but does not yet
      // have an OAuth account connected to it, you can transfer the OAuth
      // account to the existing user account.
      const userExistsButNeedsToSignIn =
        signUp.verifications.externalAccount.status === "transferable" &&
        signUp.verifications.externalAccount.error?.code ===
          "external_account_exists";

      if (userExistsButNeedsToSignIn) {
        const res = await signIn.create({ transfer: true });

        if (res.status === "complete") {
          setActive({
            session: res.createdSessionId,
          });
        }
      }

      // If the user has an OAuth account but does not yet
      // have an account in your app, you can create an account
      // for them using the OAuth information.
      const userNeedsToBeCreated =
        signIn.firstFactorVerification.status === "transferable";

      if (userNeedsToBeCreated) {
        const res = await signUp.create({
          transfer: true,
        });

        if (res.status === "complete") {
          setActive({
            session: res.createdSessionId,
          });
        }
      } else {
        // If the user has an account in your application
        // and has an OAuth account connected to it, you can sign them in.
        signInWith(strategy);
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }

  // Render a button for each supported OAuth provider
  // you want to add to your app. This example uses only Google.
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast.promise(handleSignIn("oauth_google"), {
          loading: "Loading...",
          success: () => {
            return `Successfully signed in with Google!!`;
          },
          error: "Error",
        });
      }}
      {...props}
    >
      <FcGoogle className="mr-2 h-5 w-5" />
      {props.children}
    </Button>
  );
};

export default GoogleOAuth;
