"use client";

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
  TForgotPasswordResetSchema,
  forgotPasswordResetSchema,
} from "@/lib/zod/schema";

// Local component imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type ForgotPasswordStep3Props = {
  onSubmit: SubmitHandler<TForgotPasswordResetSchema>;
};

export default function ForgotPasswordStep3({
  onSubmit,
}: ForgotPasswordStep3Props) {
  const { isLoaded } = useSignIn();

  const form = useForm<TForgotPasswordResetSchema>({
    resolver: zodResolver(forgotPasswordResetSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
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
                Enter your new password below
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              id="newPassword"
                              type="password"
                              placeholder="Enter your new password"
                              {...form.register("newPassword")}
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
                          <FormLabel>Confirm new password</FormLabel>
                          <FormControl>
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="Confirm your new password"
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
                    Login
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
