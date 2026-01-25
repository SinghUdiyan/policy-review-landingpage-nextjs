"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2 } from "lucide-react";

const INSURANCE_OPTIONS = [
  "LIC",
  "HDFC Life",
  "ICICI Prudential",
  "SBI Life",
  "Max Life",
  "Tata AIA",
  "Bajaj Allianz",
  "Other",
] as const;

const schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().min(10, "Enter a valid 10-digit mobile number").max(15, "Enter a valid mobile number"),
  email: z.union([z.string().email("Invalid email"), z.literal("")]).optional(),
  insuranceCompany: z.enum([...INSURANCE_OPTIONS]),
  otherCompany: z.string().optional(),
}).refine(
  (data) => {
    if (data.insuranceCompany === "Other") {
      return (data.otherCompany?.trim().length ?? 0) >= 2;
    }
    return true;
  },
  { message: "Enter insurance company name", path: ["otherCompany"] }
);

type FormValues = z.infer<typeof schema>;

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      insuranceCompany: "LIC",
      otherCompany: "",
    },
  });

  const insuranceCompany = form.watch("insuranceCompany");
  const isOther = insuranceCompany === "Other";

  async function onSubmit(values: FormValues) {
    setError(null);
    const company = values.insuranceCompany === "Other"
      ? (values.otherCompany?.trim() || "Other")
      : values.insuranceCompany;

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: values.fullName.trim(),
          mobile: values.mobile.trim(),
          email: values.email?.trim() || "",
          insuranceCompany: company,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
  }

  function handleOpenChange(next: boolean) {
    if (!next) {
      setSubmitted(false);
      form.reset();
      setError(null);
    }
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-md bg-white border-gray-200"
        showCloseButton={!submitted}
      >
        {submitted ? (
          <div className="py-6 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Thank you!</h3>
            <p className="text-gray-600 mb-6">
              Your early access request has been received. We&apos;ll update you once our platform is ready.
            </p>
            <Button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white font-semibold"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900">
                Join Waitlist
              </DialogTitle>
              <DialogDescription>
                Get early access when we launch. We&apos;ll notify you.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  {...form.register("fullName")}
                  placeholder="e.g. Rajesh Kumar"
                  className="h-11 border-gray-300"
                />
                {form.formState.errors.fullName && (
                  <p className="text-red-600 text-sm mt-1">{form.formState.errors.fullName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <Input
                  {...form.register("mobile")}
                  type="tel"
                  placeholder="e.g. 9876543210"
                  className="h-11 border-gray-300"
                />
                {form.formState.errors.mobile && (
                  <p className="text-red-600 text-sm mt-1">{form.formState.errors.mobile.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email (Optional)</label>
                <Input
                  {...form.register("email")}
                  type="email"
                  placeholder="e.g. you@example.com"
                  className="h-11 border-gray-300"
                />
                {form.formState.errors.email && (
                  <p className="text-red-600 text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Which policy do you want to review? <span className="text-red-500">*</span>
                </label>
                <select
                  {...form.register("insuranceCompany")}
                  className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                >
                  {INSURANCE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              {isOther && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Enter Insurance Company Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    {...form.register("otherCompany")}
                    placeholder="Enter insurance company name"
                    className="h-11 border-gray-300"
                  />
                  {form.formState.errors.otherCompany && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.otherCompany.message}</p>
                  )}
                </div>
              )}
              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white font-semibold"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
