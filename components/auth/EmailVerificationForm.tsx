import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { TVerifyEmailSchema, verifyEmailSchema } from "@/lib/zod/schema";

interface EmailVerificationFormProps {
  onSubmit: SubmitHandler<TVerifyEmailSchema>;
}

export default function EmailVerificationForm({
  onSubmit,
}: EmailVerificationFormProps) {
  const form = useForm<TVerifyEmailSchema>({
    resolver: zodResolver(verifyEmailSchema),
  });

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center space-y-4"
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4">
                <FormLabel>Verification code</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the verification code sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
