"use client";

import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TLoginSchema } from "@/lib/zod/schema";

import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import GoogleOAuth from "./GoogleOAuth";
import GithubOAuth from "./GithubOAuth";
import { ThemeToggle } from "../ThemeToggle";

export default function FormDemo() {
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { isLoaded, signIn, setActive } = useSignIn();

  const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
    if (!isLoaded) {
      return;
    }

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        toast.success("Login successful!");
        form.reset();
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.

        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      if (isClerkAPIResponseError(err)) {
        const errorMessage = err.errors[0]?.message || "An error occurred";
        toast.error(errorMessage);
      }
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      <div className="absolute">
        <ThemeToggle />
      </div>
      <div className="flex w-full h-screen items-center justify-center">
        <div className="w-full">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-4">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>

              <div className="grid gap-4">
                <GoogleOAuth className="w-full">Signin with Google</GoogleOAuth>
                <GithubOAuth className="w-full">Signin with Github</GithubOAuth>
              </div>

              <div className="flex items-center justify-center my-4">
                <hr className="border-t  flex-grow" />
                <span className="px-2  text-sm text-neutral-400">or</span>
                <hr className="border-t  flex-grow" />
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                {...form.register("email")}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center">
                              <FormLabel>Password</FormLabel>
                              <Link
                                href="/forgot-password"
                                className="ml-auto inline-block text-sm underline"
                              >
                                Forgot your password?
                              </Link>
                            </div>
                            <FormControl>
                              <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                {...form.register("password")}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={form.formState.isSubmitting}
                    >
                      Login
                    </Button>
                  </div>

                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/sign-up" className="underline">
                      Sign up
                    </Link>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
