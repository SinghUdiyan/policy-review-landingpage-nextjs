"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { isWaitlistMode } from "@/lib/config/waitlist";
import { useWaitlist } from "@/lib/context/WaitlistContext";

export default function Hero() {
  const isWaitlist = isWaitlistMode();
  const { openModal } = useWaitlist();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20 bg-gradient-to-br from-gray-50 via-white to-teal-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, var(--teal-9) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, var(--gray-9) 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
          >
            Is Your Insurance Policy Really{" "}
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Growing Your Money?
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Get a <strong>FREE transparent review</strong> of your insurance policy. Know your real returns, compare with FD & Mutual Funds, and make informed decisions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            {isWaitlist ? (
              <button
                onClick={openModal}
                className="btn-primary text-lg px-8 py-4"
              >
                Join Waitlist
              </button>
            ) : (
              <Link
                href="/review"
                className="btn-primary text-lg px-8 py-4"
              >
                Review My Policy FREE
              </Link>
            )}
            <a href="#how-it-works" className="btn-outline text-lg px-8 py-4">
              Learn More
            </a>
          </motion.div>

          {/* Trust Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {isWaitlist ? (
              <>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Transparent Analysis</div>
                  <div className="text-gray-600">No hidden agenda</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Zero Bias</div>
                  <div className="text-gray-600">Unbiased insights</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">No Spam, Ever</div>
                  <div className="text-gray-600">We respect your inbox</div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
                  <div className="text-gray-600">Policies Reviewed</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="text-3xl font-bold text-gray-900 mb-2">₹500 Cr+</div>
                  <div className="text-gray-600">Assets Analyzed</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
                  <div className="text-gray-600">Customer Rating</div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-teal-100 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-5 w-12 h-12 bg-gray-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  );
}
