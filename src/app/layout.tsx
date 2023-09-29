import "./globals.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSideSession } from "@/lib/serverUtils";
import RootStyleRegistry from "@/app/providers";
import NavigationBar from "@/components/custom/navbar";
import type { Session } from "@supabase/auth-helpers-nextjs";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Market",
  description: "Open Market is an open source marketplace.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: Session | null = await getServerSideSession();
  console.log("session: ", session);
  return (
    <html lang="en">
      <body className={"dark"}>
        <RootStyleRegistry session={session}>
          <NavigationBar session={session} />
          <div className="min-h-screen bg-dark-mode-background">{children}</div>
        </RootStyleRegistry>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
