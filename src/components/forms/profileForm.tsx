"use client";
import React, { type FC } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { Button, Input, Textarea } from "@nextui-org/react";
import type { profile } from "@prisma/client";

const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2).max(50),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  bio: z.string().min(2).max(256),
  phone: z.string().min(2).max(10),
});

type ProfileFormValues = z.infer<typeof formSchema>;

type Props = {
  profile: profile | null;
};
export const ProfileForm: FC<Props> = (props: Props) => {
  const { profile } = props;
  const defaultValues: Partial<ProfileFormValues> = {
    email: profile?.email || "",
    username: profile?.username || "",
    firstName: profile?.first_name || "",
    lastName: profile?.last_name || "",
    bio: profile?.bio || "",
    phone: profile?.phone_number || "",
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { toast } = useToast();
  const onSubmit = async (payload: ProfileFormValues) => {
    try {
      console.log("payload: ", payload);
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
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
            <FormItem className="flex flex-col">
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input placeholder="User Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phpne Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <Button className="w-[100%]" type="submit">
            Update Profile
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
