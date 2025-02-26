import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/lib/provider";
import { Toaster } from "@/components/ui/toaster";
import { Montserrat } from "next/font/google";
import OpenWidget from "@/components/Main/OpenWidget";

const montserrat = Montserrat({
  subsets: ["cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Company 1 | Car Subscriptions Made Simple",
  description:
    "Subscribe to cars with flexible terms and secure ownership options.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen bg-background antialiased ${montserrat.className}`}
      >
        <Providers>{children}</Providers>
        <Toaster />
        <OpenWidget />
      </body>
    </html>
  );
}
