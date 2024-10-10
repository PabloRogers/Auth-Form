import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountDetailsSchema, TAccountDetailsSchema } from "@/lib/zod/schema";
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
import { FC } from "react";

interface SignupStep2Props {
  onSubmit: SubmitHandler<TAccountDetailsSchema>;
}

export const SignupStep2: FC<SignupStep2Props> = ({ onSubmit }) => {
  const form = useForm<TAccountDetailsSchema>({
    resolver: zodResolver(accountDetailsSchema),
  });

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="w-full">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-4">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Create Account</h1>
              <p className="text-balance text-muted-foreground">
                Enter your account details below
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              id="username"
                              type="text"
                              placeholder="Enter your username"
                              {...form.register("username")}
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
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              id="firstName"
                              type="text"
                              placeholder="Enter your first name"
                              {...form.register("firstName")}
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
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              id="lastName"
                              type="text"
                              placeholder="Enter your last name"
                              {...form.register("lastName")}
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
  );
};
