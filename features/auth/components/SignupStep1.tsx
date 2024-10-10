"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import GoogleOAuth from "@/features/auth/components/GoogleOAuth";
import GithubOAuth from "@/features/auth/components/GithubOAuth";
import { signupSchema, TSignupSchema } from "@/lib/zod/schema";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FC } from "react";

interface SignUpFormProps {
  onSubmit: SubmitHandler<TSignupSchema>;
}

export const SignupStep1: FC<SignUpFormProps> = ({ onSubmit }) => {
  const form = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
  });

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
                <h1 className="text-3xl font-bold">Create Account</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>

              <div className="grid gap-4">
                <GoogleOAuth className="w-full">Login with Google</GoogleOAuth>
                <GithubOAuth className="w-full">Login with Github</GithubOAuth>
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
                            <FormLabel>Password</FormLabel>
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

                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                {...form.register("confirmPassword")}
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
                      Continue
                    </Button>
                  </div>

                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/sign-in" className="underline">
                      Sign in
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
};
