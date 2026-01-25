"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { isWaitlistMode } from "@/lib/config/waitlist";
import { useWaitlist } from "@/lib/context/WaitlistContext";
import { Heart, Sparkles, Shield, Lightbulb, CheckCircle2, Brain, MessageCircle, Zap, TrendingUp, ArrowRight } from "lucide-react";

const naitriFeatures = [
  {
    icon: MessageCircle,
    title: "Ask Anything",
    description: "You can ask Naitri anything about your investments, insurance, or finances, and you will get honest, clear, and personalized answers.",
  },
  {
    icon: Lightbulb,
    title: "Simple Explanations",
    description: "Naitri understands your questions, analyses your policies, compares options, and explains everything in simple language.",
  },
  {
    icon: TrendingUp,
    title: "Personalized Insights",
    description: "Get actionable recommendations tailored to your financial situation and goals.",
  },
];

const friendQualities = [
  "A friend who thinks about your well-being.",
  "A friend who cares about your money.",
  "A friend who helps you make better decisions.",
];

export default function NaitriPage() {
  const isWaitlist = isWaitlistMode();
  const { openModal } = useWaitlist();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-gray-50 via-white to-teal-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, var(--teal-9) 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, var(--gray-9) 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-xl mb-8"
            >
              <Heart className="w-12 h-12 text-gray-700 fill-gray-700" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Meet Naitri
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Your trusted financial friend powered by AI
            </motion.p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl p-10 border border-teal-100">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                      <Sparkles className="w-7 h-7 text-gray-700" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        The Heart of Policy Review
                      </h2>
                      <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        <strong className="text-gray-900">Naitri is the heart of Policy Review.</strong>
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Every policy review, calculation, and analysis on our platform is powered by Naitri.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-3xl p-10 border border-gray-200 shadow-lg"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-gray-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">More Than Technology</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    You can call Naitri an AI system —
                    but for us, <strong className="text-gray-900">Naitri is much more than technology.</strong>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Friend Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <Heart className="w-10 h-10 fill-white" />
                <h2 className="text-3xl md:text-4xl font-bold">Naitri is your financial friend.</h2>
              </div>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {friendQualities.map((quality, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                >
                  <CheckCircle2 className="w-8 h-8 mb-4 text-white" />
                  <p className="text-lg text-gray-200 leading-relaxed">{quality}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <p className="text-xl text-gray-200 leading-relaxed text-center">
                Just like someone who truly wants the best for you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Naitri Can Do For You
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your personal financial advisor, available 24/7
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {naitriFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-10 md:p-12 border border-gray-200 shadow-lg"
            >
              <div className="flex items-start gap-5 mb-8">
                <div className="flex-shrink-0 w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">How Naitri Works</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Naitri understands your questions, analyses your policies, compares options, and explains everything
                    in simple language — just like someone who truly wants the best for you.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    You can ask Naitri anything about your investments, insurance, or finances, and you will get honest,
                    clear, and personalized answers.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Statement */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-teal-600 to-blue-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <Shield className="w-10 h-10" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Not Just a Digital Assistant
              </h2>
            </div>
            <p className="text-2xl md:text-3xl font-semibold mb-10 text-white/95">
              Naitri is your trusted companion on your financial journey.
            </p>
            {isWaitlist ? (
              <button
                onClick={openModal}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl font-semibold text-lg"
              >
                Join Waitlist
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <Link
                href="/review"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl font-semibold text-lg"
              >
                Start Talking to Naitri
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

