"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Linkedin, Target, Users, Heart, Sparkles, Shield, TrendingUp, Lightbulb, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";

const teamMembers = [
  {
    name: "Sarthak Patel",
    role: "Founder — Policy Review",
    image: "/assets/images/pics/sarthak patel.jpeg",
    linkedin: "https://www.linkedin.com/in/sarthak-patel-6a308b1b3/",
  },
  {
    name: "Krishna Karthik Bagalkote",
    role: "Advisor — Product & Strategy",
    image: "/assets/images/pics/karthik bagalkote.jpeg",
    linkedin: "https://www.linkedin.com/in/karthikbagalkote/",
  },
];

const problemStats = [
  {
    percentage: "57.6%",
    description: "of Relationship Managers were instructed to sell specific products at any cost.",
  },
  {
    percentage: "84.3%",
    description: "experienced high pressure to meet sales targets.",
  },
  {
    percentage: "51.5%",
    description: "feared losing their job if quotas weren't met.",
  },
];

export default function AboutPage() {
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-8"
            >
              <Target className="w-10 h-10 text-gray-700" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              About Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Building India&apos;s first transparent platform for policy review and financial awareness
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-lg">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-gray-700" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Policy Review is a brand under <strong className="text-gray-900 font-semibold">Bhamashah Pvt. Ltd.</strong>, built with one mission —
                    to help policyholders review and understand their Insurance-cum-Investment policies with
                    complete transparency.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                <AlertCircle className="w-6 h-6 text-gray-700" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                The Problem We&apos;re Solving
              </h2>
            </div>
            
            <p className="text-lg text-gray-700 mb-10 leading-relaxed max-w-4xl">
              In India, mis-selling of financial products is a serious problem. According to a survey by <strong className="text-gray-900">1 Finance Magazine</strong>:
            </p>
            
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {problemStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{stat.percentage}</div>
                  <p className="text-gray-600 leading-relaxed">{stat.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-md">
              <p className="text-lg text-gray-700 leading-relaxed">
                Because of this, many people end up buying financial products—especially traditional insurance-
                cum-investment plans—that do not match their needs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Solution</h2>
                <p className="text-xl leading-relaxed text-gray-200 mb-6">
                  Policy Review was created to solve this issue.
                </p>
                <p className="text-xl leading-relaxed text-gray-200 mb-8">
                  We have built <strong className="text-white">India&apos;s first platform</strong> that helps you review your policy, understand the real returns,
                  compare it with other investment options, and decide whether the policy truly benefits you — all in
                  a simple and easy way.
                </p>
                <div className="flex items-center gap-3 text-gray-300">
                  <TrendingUp className="w-6 h-6" />
                  <span className="text-lg">And we continue to improve the platform every day.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-6"
              >
                <Target className="w-10 h-10 text-gray-700" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Vision
              </h2>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl p-10 md:p-14 border border-teal-100 shadow-xl">
              <div className="text-center">
                <div className="text-6xl text-gray-300 mb-6">&ldquo;</div>
                <p className="text-2xl md:text-3xl text-gray-800 italic leading-relaxed font-medium max-w-3xl mx-auto">
                  To make every Indian capable of understanding all financial products that affect their personal
                  finances, and confident enough to take the right decisions—so no one can mislead or misuse
                  them.
                </p>
                <div className="text-6xl text-gray-300 mt-6">&rdquo;</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-md mb-6"
              >
                <Users className="w-10 h-10 text-gray-700" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Team
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="bg-white rounded-3xl p-10 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="w-36 h-36 mx-auto mb-8 rounded-full overflow-hidden bg-gray-100 ring-4 ring-gray-200">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-full flex flex-col items-center justify-center text-gray-400 text-sm p-2 text-center">Photo Placeholder<br/>(Replace with ' + (index === 0 ? 'Founder' : 'Advisor') + ' Image)</div>';
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{member.name}</h3>
                  <p className="text-gray-600 mb-8 text-lg">{member.role}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="font-medium">Connect on LinkedIn</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-teal-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Review Your Policy?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Join thousands of Indians making informed financial decisions with Policy Review.
            </p>
            <Link
              href="/review"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-lg"
            >
              Review My Policy FREE
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

