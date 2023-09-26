import "./globals.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import { getServerSideSession } from "@/lib/serverUtils";
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
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
