"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Text } from "@radix-ui/themes";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { HeartFilledIcon } from "@radix-ui/react-icons";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

type SignInFormValues = z.infer<typeof formSchema>;
const defaultValues: Partial<SignInFormValues> = {
  email: "",
  password: "",
};
type Props = {
  toggleForm: () => void;
};
export const SignInForm = (props: Props) => {
  const { toggleForm } = props;
  const router = useRouter();
  const supabase = createClientComponentClient();
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { toast } = useToast();
  const onSubmit = async (payload: SignInFormValues) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

      if (error) throw error;
      toast({
        title: `Welcome back, ${data?.user?.user_metadata?.username}`,
        description: "You have successfully logged in.",
        action: <HeartFilledIcon color="red" />,
      });

      router.push("/");
    } catch (error) {
      console.log("error: ", error);
      toast({
        title: "Error",
        description: "There was an error logging in. Please try again.",
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
        <div>
          <Link href="#">
            <Text
              onClick={() => {
                toggleForm();
              }}
            >
              Register for an account
            </Text>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <Button className="w-[100%]" type="submit">
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
