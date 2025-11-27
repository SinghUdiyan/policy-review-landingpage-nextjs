"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Target, Users, Heart, Sparkles, Shield, TrendingUp, Lightbulb, CheckCircle2, AlertCircle } from "lucide-react";

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

const naitriFeatures = [
  "A friend who thinks about your well-being.",
  "A friend who cares about your money.",
  "A friend who helps you make better decisions.",
];

export default function AboutUs() {
  return (
    <section id="about" className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* About Policy Review - Serial Position Effect: Important info first */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-24"
        >
          {/* Section Header - Law of Prägnanz: Simple, clear */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6"
            >
              <Target className="w-8 h-8 text-gray-700" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              About Us
            </h2>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto"></div>
          </div>
          
          {/* Mission Card - Law of Common Region: Grouped content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl p-8 md:p-10 mb-12 border border-gray-200 shadow-sm"
          >
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Policy Review is a brand under <strong className="text-gray-900 font-semibold">Bhamashah Pvt. Ltd.</strong>, built with one mission —
                  to help policyholders review and understand their Insurance-cum-Investment policies with
                  complete transparency.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Problem Section - Miller's Law: Chunked into 3 stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                The Problem We&apos;re Solving
              </h3>
            </div>
            
            <p className="text-gray-700 mb-8 leading-relaxed max-w-3xl">
              In India, mis-selling of financial products is a serious problem. According to a survey by <strong className="text-gray-900">1 Finance Magazine</strong>:
            </p>
            
            {/* Stats Cards - Law of Similarity: Similar styling, Law of Proximity: Grouped */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {problemStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{stat.percentage}</div>
                  <p className="text-gray-600 text-sm leading-relaxed">{stat.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed">
                Because of this, many people end up buying financial products—especially traditional insurance-
                cum-investment plans—that do not match their needs.
              </p>
            </div>
          </motion.div>

          {/* Solution Section - Von Restorff Effect: Subtle emphasis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-900 rounded-2xl p-8 md:p-10 text-white"
          >
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Solution</h3>
                <p className="text-lg leading-relaxed text-gray-200 mb-4">
                  Policy Review was created to solve this issue.
                </p>
                <p className="text-lg leading-relaxed text-gray-200 mb-6">
                  We have built <strong className="text-white">India&apos;s first platform</strong> that helps you review your policy, understand the real returns,
                  compare it with other investment options, and decide whether the policy truly benefits you — all in
                  a simple and easy way.
                </p>
                <div className="flex items-center gap-2 text-gray-300">
                  <TrendingUp className="w-5 h-5" />
                  <span>And we continue to improve the platform every day.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Our Vision - Serial Position Effect: Important section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-24"
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6"
            >
              <Target className="w-8 h-8 text-gray-700" />
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Our Vision
            </h3>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto"></div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl p-10 md:p-12 border border-gray-200 shadow-sm"
          >
            <div className="text-center">
              <div className="text-5xl text-gray-300 mb-4">&ldquo;</div>
              <p className="text-xl md:text-2xl text-gray-800 italic leading-relaxed font-medium max-w-3xl mx-auto">
                To make every Indian capable of understanding all financial products that affect their personal
                finances, and confident enough to take the right decisions—so no one can mislead or misuse
                them.
              </p>
              <div className="text-5xl text-gray-300 mt-4">&rdquo;</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Our Team - Law of Proximity: Grouped team members */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-24"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6"
            >
              <Users className="w-8 h-8 text-gray-700" />
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Our Team
            </h3>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden bg-gray-100 ring-2 ring-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full flex flex-col items-center justify-center text-gray-400 text-xs p-2 text-center">Photo Placeholder<br/>(Replace with ' + (index === 0 ? 'Founder' : 'Advisor') + ' Image)</div>';
                      }
                    }}
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-gray-600 mb-6">{member.role}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  // Fitts's Law: Larger clickable area
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm font-medium">Connect</span>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* About Naitri - Serial Position Effect: Important closing section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
          id="naitri"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6"
            >
              <Heart className="w-8 h-8 text-gray-700" />
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              About Naitri
            </h3>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto"></div>
          </div>
          
          {/* Main Naitri Card - Law of Common Region */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm mb-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-lg text-gray-800 leading-relaxed mb-4">
                    <strong className="text-gray-900 font-semibold">Naitri is the heart of Policy Review.</strong>
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Every policy review, calculation, and analysis on our platform is powered by Naitri.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <p className="text-lg text-gray-800 leading-relaxed">
                  You can call Naitri an AI system —
                  but for us, <strong className="text-gray-900 font-semibold">Naitri is much more than technology.</strong>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Friend Section - Miller's Law: 3 items, chunked */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-900 rounded-2xl p-8 md:p-10 text-white mb-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl md:text-3xl font-bold">Naitri is your financial friend.</h4>
            </div>
            
            {/* Law of Similarity: Similar card styling, Law of Proximity: Grouped */}
            <div className="grid md:grid-cols-3 gap-4">
              {naitriFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-xl p-5 border border-white/10"
                >
                  <CheckCircle2 className="w-5 h-5 mb-3 text-gray-300" />
                  <p className="text-gray-200 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features Grid - Law of Continuity: Aligned flow */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-gray-600" />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Naitri understands your questions, analyses your policies, compares options, and explains everything
                  in simple language — just like someone who truly wants the best for you.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gray-600" />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  You can ask Naitri anything about your investments, insurance, or finances, and you will get honest,
                  clear, and personalized answers.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Final Statement - Serial Position Effect: Important closing */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-900 rounded-2xl p-8 md:p-10 text-white text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-gray-300" />
              <p className="text-2xl md:text-3xl font-bold">
                Naitri is not just a digital assistant.
              </p>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-gray-200">
              Naitri is your trusted companion on your financial journey.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
