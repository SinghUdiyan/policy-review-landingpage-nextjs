import type { Metadata } from "next";
import { Quicksand, Nunito, Lora } from "next/font/google";
import "./globals.css";
import { WaitlistLayoutWrapper } from "@/components/WaitlistLayoutWrapper";

const quicksand = Quicksand({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
});

const nunito = Nunito({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-nunito",
});

const lora = Lora({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Free LIC Policy Review | Know Your Real Returns | PolicyReview.co.in",
  description: "Get a free transparent review of your LIC policy. Know your real returns, compare with FD & Mutual Funds, and get actionable insights. Trusted by thousands of Indians.",
  keywords: "LIC policy review, insurance policy analysis, LIC returns calculator, policy surrender value, mutual fund vs LIC, insurance investment review",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${nunito.variable} ${quicksand.variable} ${lora.variable} ${nunito.className}`}>
        <WaitlistLayoutWrapper>{children}</WaitlistLayoutWrapper>
      </body>
    </html>
  );
}
