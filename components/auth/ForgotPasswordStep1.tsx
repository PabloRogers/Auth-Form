// Clerk imports
import { useSignIn, useAuth } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

// External library imports
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { toast } from "sonner";

// Local utility imports
import {
  TForgotPasswordEmailSchema,
  forgotPasswordEmailSchema,
} from "@/lib/zod/schema";

// Local component imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type ForgotPasswordEmailProps = {
  onSubmit: SubmitHandler<TForgotPasswordEmailSchema>;
};

export default function ForgotPasswordStep1({
  onSubmit,
}: ForgotPasswordEmailProps) {
  const { isLoaded, signIn, setActive } = useSignIn();

  const form = useForm<TForgotPasswordEmailSchema>({
    resolver: zodResolver(forgotPasswordEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="w-full">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-4">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Forgot Password</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to reset your password.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => onSubmit(data))}>
                <div className="grid gap-4 ">
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
                              placeholder="Enter your email"
                              {...form.register("email")}
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
                  <div className="mt-4 text-center text-sm">
                    Remembered your password?{" "}
                    <Link href="/sign-in" className="underline">
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
