import "./globals.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSideSession } from "@/lib/serverUtils";
import RootStyleRegistry from "@/app/providers";
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
  const session = await getServerSideSession();
  console.log("session: ", session);
  return (
    <html lang="en">
      <body className={"dark"}>
        <RootStyleRegistry session={session}>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
