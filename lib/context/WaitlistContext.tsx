"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { WaitlistModal } from "@/components/WaitlistModal";

type WaitlistContextValue = {
  openModal: () => void;
  closeModal: () => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) {
    throw new Error("useWaitlist must be used within WaitlistProvider");
  }
  return ctx;
}

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <WaitlistContext.Provider value={{ openModal, closeModal }}>
      {children}
      <WaitlistModal open={open} onOpenChange={setOpen} />
    </WaitlistContext.Provider>
  );
}
