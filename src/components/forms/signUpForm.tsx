"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Text } from "@radix-ui/themes";
import { Label } from "../ui/label";
import Link from "next/link";
const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(50),
  terms: z.boolean().default(false),
});

type SignInFormValues = z.infer<typeof formSchema>;
const defaultValues: Partial<SignInFormValues> = {
  username: "",
  email: "",
  password: "",
  terms: false,
};

type Props = {
  toggleForm: () => void;
};
export const SignUpForm = (props: Props) => {
  const { toggleForm } = props;
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { toast } = useToast();

  const router = useRouter();
  const supabase = createClientComponentClient();
  const onSubmit = async (payload: SignInFormValues) => {
    try {
      if (!payload.terms) return;
      const { data, error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (error) throw error;

      if (!error) {
        toast({
          title: "Signed up",
          description: "Check your email for the confirmation link",
          action: <ToastAction altText="Signed Up">Signed Up</ToastAction>,
        });
        router.refresh();
      }
    } catch (error) {
      console.log("error: ", error);
      toast({
        title: "Error",
        description: "Error Signing up",
        action: <ToastAction altText="Error">Error</ToastAction>,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="terms">
                    I agree to the terms and conditions
                  </Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Link href="#">
            <Text
              onClick={() => {
                toggleForm();
              }}
            >
              Already have an account? Sign in
            </Text>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <Button className="w-[100%]" type="submit">
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
