"use client";

import { WaitlistProvider } from "@/lib/context/WaitlistContext";

export function WaitlistLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WaitlistProvider>{children}</WaitlistProvider>;
}
