"use client";
import SupabaseProvider from "./supabase-provider";
import type { Session } from "@supabase/supabase-js";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "@/components/ui/toaster";
export default function RootStyleRegistry({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null | undefined;
}) {
  return (
    <SupabaseProvider>
      <Theme>{children}</Theme>
      <Toaster />
    </SupabaseProvider>
  );
}
