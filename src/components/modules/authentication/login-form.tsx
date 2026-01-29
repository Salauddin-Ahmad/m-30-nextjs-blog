"use client";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z.email(),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:4000",
    });
  };

const form = useForm({
  defaultValues: {
    email: "",
    password: "",
  },
  onSubmit: async ({ value }) => {
    // Validate first
    const validation = formSchema.safeParse(value);
    if (!validation.success) {
      toast.error("Please check your inputs");
      console.log(validation.error); // Check what's failing
      return;
    }

    const toastId = toast.loading("Logging in User");
    try {
      const { data, error } = await authClient.signIn.email(value);
      if (error) {
        toast.error(error.message, { id: toastId });
        return;
      }
      toast.success("User Logged in successfully", { id: toastId });
    } catch (error) {
      toast.error("Something went wrong, please try again.", { id: toastId });
    }
  },
});
  // const form = useForm({
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  //   onSubmit: async ({ value }) => {
  //     // Validate with Zod
  //     const result = formSchema.safeParse(value);
  //     if (!result.success) {
  //       toast.error("Please check your input");
  //       return;
  //     }

  //     const toastId = toast.loading("Logging in User");
  //     try {
  //       const { data, error } = await authClient.signIn.email(value);
  //       if (error) {
  //         toast.error(error.message, { id: toastId });
  //         return;
  //       }
  //       toast.success("User Logged in successfully", { id: toastId });
  //     } catch (error) {
  //       toast.error("Something went wrong, please try again.", { id: toastId });
  //     }
  //   },
  // });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                );
              }}
            ></form.Field>

            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                );
              }}
            ></form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col justify-end gap-5">
        <Button form="login-form" type="submit" className="w-full">
          Login
        </Button>

        <Button
          onClick={() => handleGoogleLogin()}
          variant={"outline"}
          type="button"
          className="w-full"
        >
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
