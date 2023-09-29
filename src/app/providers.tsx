"use client";
import SupabaseProvider from "./supabase-provider";
import type { Session } from "@supabase/supabase-js";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "@/components/ui/toaster";
import { NextUIProvider } from "@nextui-org/react";
export default function RootStyleRegistry({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null | undefined;
}) {
  return (
    <SupabaseProvider>
      <NextUIProvider>
        <Theme>{children}</Theme>
        <Toaster />
      </NextUIProvider>
    </SupabaseProvider>
  );
}
