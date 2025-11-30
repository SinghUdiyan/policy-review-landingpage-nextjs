"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Shield, CheckCircle, FileText } from "lucide-react";
import PolicyReviewForm from "@/components/PolicyReviewForm";

export default function ReviewPage() {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(true);

  const handleFormClose = (open: boolean) => {
    if (!open) {
      setIsFormOpen(false);
      setTimeout(() => {
        router.push('/');
      }, 200);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors group">
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Image 
                src="/Logo.png" 
                alt="PolicyReview" 
                width={240}
                height={240}
                className="h-10 w-auto"
                priority
                quality={100}
                style={{ objectFit: 'contain' }}
                onError={(e) => {
                  // Fallback to text if image doesn't exist
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) nextElement.style.display = 'block';
                }}
              />
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 hidden">PolicyReview.co.in</h1>
              </div>
            </div>
            <div className="w-20 md:w-32"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-lora), 'Lora', serif" }}>
            Review Your LIC Policy
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Get a comprehensive, unbiased analysis of your policy&apos;s performance in just 3 minutes
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <div className="p-1.5 bg-green-100 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">100% Free</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <div className="p-1.5 bg-purple-100 rounded-lg">
                <FileText className="h-4 w-4 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Instant Report</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="animate-fade-in">
          <PolicyReviewForm 
            open={isFormOpen} 
            onOpenChange={handleFormClose}
            inline={true}
          />
        </div>

        {/* Bottom Privacy Notice */}
        <div className="mt-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-gray-200 inline-block max-w-2xl">
            <div className="flex items-start space-x-3 text-left">
              <Shield className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-600">
                <p className="font-semibold text-gray-900 mb-1">Your Privacy Matters</p>
                <p>Your policy information is secure and will only be used to generate your personalized review report. We never share your data with third parties.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
