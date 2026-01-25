"use client";

import { motion } from "framer-motion";
import { CheckCircle, BarChart3, TrendingUp, Brain } from "lucide-react";
import { isWaitlistMode } from "@/lib/config/waitlist";

const featuresFull = [
  {
    icon: BarChart3,
    title: "Policy Analysis & Scoring",
    description: "Get comprehensive analysis of your insurance policy with detailed scoring based on returns, liquidity, and safety parameters.",
    benefits: [
      "Overall Policy Score (out of 5)",
      "Return Timeline Analysis",
      "Risk Assessment",
      "Liquidity Analysis"
    ]
  },
  {
    icon: TrendingUp,
    title: "Alternative Comparison",
    description: "Compare your policy performance against Fixed Deposits, Mutual Funds, and other investment options to make informed decisions.",
    benefits: [
      "Benchmark Comparisons",
      "Return vs Risk Analysis",
      "Market Performance Tracking",
      "Alternative Recommendations"
    ]
  },
  {
    icon: Brain,
    title: "Actionable Recommendations",
    description: "Get personalized recommendations from our AI assistant Naitri for better financial decisions and portfolio optimization.",
    benefits: [
      "AI-Powered Insights",
      "Personalized Strategies",
      "Action Plans",
      "Portfolio Optimization"
    ]
  }
];

const featuresWaitlist = [
  {
    icon: BarChart3,
    title: "Policy Analysis & Scoring",
    description: "Get comprehensive analysis of your insurance policy with detailed scoring based on returns, liquidity, and safety parameters.",
    benefits: [
      "Overall Policy Score (out of 5)",
      "Return Timeline Analysis",
      "Risk Assessment",
      "Liquidity Analysis"
    ]
  },
  {
    icon: TrendingUp,
    title: "Alternative Comparison",
    description: "Compare your policy performance against Fixed Deposits, Mutual Funds, and other investment options to make informed decisions.",
    benefits: [
      "Benchmark Comparisons",
      "Return vs Risk Analysis",
      "Market Performance Tracking",
      "Alternative Analysis"
    ]
  },
  {
    icon: Brain,
    title: "Actionable Insights",
    description: "Get personalized recommendations from our AI assistant Naitri for better financial decisions and portfolio optimization.",
    benefits: [
      "AI-Powered Insights",
      "Simplified Review",
      "Action Plans",
      "Portfolio Optimization"
    ]
  }
];

export default function Features() {
  const isWaitlist = isWaitlistMode();
  const features = isWaitlist ? featuresWaitlist : featuresFull;

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, var(--teal-9) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, var(--gray-9) 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What We Offer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive policy analysis tools designed to help you make informed financial decisions
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 h-full">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <motion.li
                      key={benefitIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (index * 0.2) + (benefitIndex * 0.1) + 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-16 h-16 bg-teal-100 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
}
