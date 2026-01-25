"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Shield, Clock } from "lucide-react";
import { isWaitlistMode } from "@/lib/config/waitlist";
import { useWaitlist } from "@/lib/context/WaitlistContext";

export default function CTA() {
  const isWaitlist = isWaitlistMode();
  const { openModal } = useWaitlist();

  return (
    <section className="py-24 bg-gradient-to-br from-teal-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, var(--teal-9) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, var(--gray-9) 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Is Your Insurance Policy Really Worth It?
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Get a comprehensive analysis of your insurance policy returns. Compare with better alternatives and make informed financial decisions.
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">100% Free Analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-teal-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Transparent & Unbiased</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-teal-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Results in 5 Minutes</span>
                  </div>
                </div>

                {isWaitlist ? (
                  <button
                    onClick={openModal}
                    className="btn-primary text-lg px-8 py-4 inline-block"
                  >
                    Join Waitlist
                  </button>
                ) : (
                  <Link
                    href="/review"
                    className="btn-primary text-lg px-8 py-4 inline-block"
                  >
                    Review My Policy FREE
                  </Link>
                )}
              </motion.div>

              {/* Visual Element */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {isWaitlist ? (
                  <div className="bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl p-8 md:p-10 text-white shadow-2xl flex items-center justify-center min-h-[180px]">
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold mb-1">Launching Soon</div>
                      <div className="text-base md:text-lg text-white/90">Join the waitlist for early access</div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Main Card */}
                    <div className="bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl p-8 text-white shadow-2xl">
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">4.9/5</div>
                        <div className="text-lg mb-4">Customer Rating</div>
                      </div>
                    </div>

                    {/* Floating Cards */}
                    <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                      <div className="text-2xl font-bold text-gray-900">50,000+</div>
                      <div className="text-sm text-gray-600">Policies Reviewed</div>
                    </div>

                    <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                      <div className="text-2xl font-bold text-gray-900">₹500 Cr+</div>
                      <div className="text-sm text-gray-600">Assets Analyzed</div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-teal-100 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-12 h-12 bg-blue-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
}
