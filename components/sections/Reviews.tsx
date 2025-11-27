"use client";

import { motion } from "framer-motion";
import { Heart, Linkedin } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

// Simple gray placeholder as data URI
const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' fill='%23e5e7eb'/%3E%3C/svg%3E";

const testimonials = [
  {
    name: "Rajesh Kumar",
    title: "IT Professional",
    company: "Mumbai",
    image: placeholderImage,
    quote: "I was shocked to see my insurance policy was giving just 4% returns when FDs were offering 7%. PolicyReview showed me the real numbers. I surrendered and invested in mutual funds - best decision ever! Saved ₹2.5 lakhs in 3 years."
  },
  {
    name: "Priya Sharma",
    title: "Teacher",
    company: "Bangalore",
    image: placeholderImage,
    quote: "The AI assistant Naitri helped me understand complex insurance terms. Now I know exactly where my money is going and what returns to expect. Very transparent platform! My new portfolio gives 12% vs 5% from my old policy."
  },
  {
    name: "Amit Patel",
    title: "Business Owner",
    company: "Delhi",
    image: placeholderImage,
    quote: "PolicyReview gave me clarity on 3 different insurance policies I had. The comparison with mutual funds was eye-opening. Saved lakhs by making informed decisions. My wealth grew by ₹8 lakhs in 2 years after switching."
  },
  {
    name: "Sneha Reddy",
    title: "Software Engineer",
    company: "Hyderabad",
    image: placeholderImage,
    quote: "Finally, a platform that shows real returns without any hidden agenda. The detailed analysis helped me decide to continue one policy and exit another. Highly recommended! Increased my returns from 5% to 11%."
  },
  {
    name: "Vikram Singh",
    title: "Bank Manager",
    company: "Pune",
    image: placeholderImage,
    quote: "As a banker, I thought I knew investments. PolicyReview opened my eyes to how much I was losing with my insurance policy. The switch to mutual funds increased my returns by 300%. Thank you for the transparency!"
  },
  {
    name: "Meera Joshi",
    title: "CA",
    company: "Ahmedabad",
    image: placeholderImage,
    quote: "PolicyReview's detailed return analysis and benchmarking against market alternatives provided the clarity I needed. My clients now get 10-12% returns instead of 4-5% from traditional policies. Game changer!"
  }
];

export default function Reviews() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="reviews" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm text-gray-500 uppercase tracking-wider mb-4"
          >
            TESTIMONIALS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-3"
          >
            Wall of Love <span className="text-[rgb(0,150,138)]">@ PolicyReview</span>
            <Heart className="w-8 h-8 text-red-500 fill-current" />
          </motion.h2>
        </div>

        {/* Single Seamless Testimonials Section */}
        <div 
          className="relative overflow-hidden pb-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Combined Testimonials with Asymmetric Layout */}
          <div className="flex flex-col gap-8">
            {/* Row 1 - Top Row */}
            <div 
              className="flex gap-6"
              style={{
                animation: isHovered ? 'scrollHorizontal 40s linear infinite paused' : 'scrollHorizontal 40s linear infinite'
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={`row1-${testimonial.name}-${index}`}
                  className="flex-shrink-0 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 w-80"
                >
                  {/* Profile */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 flex items-center justify-center">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-sm truncate">{testimonial.name}</h4>
                      <p className="text-xs text-gray-600 truncate">{testimonial.title}</p>
                      <p className="text-xs text-gray-500 truncate">{testimonial.company}</p>
                    </div>
                    <Linkedin className="w-4 h-4 text-[rgb(2,54,125)] flex-shrink-0" />
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-gray-700 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>

            {/* Row 2 - Bottom Row (Offset) */}
            <div 
              className="flex gap-6 ml-40"
              style={{
                animation: isHovered ? 'scrollHorizontal 45s linear infinite paused' : 'scrollHorizontal 45s linear infinite'
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={`row2-${testimonial.name}-${index}`}
                  className="flex-shrink-0 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 w-80"
                >
                  {/* Profile */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 flex items-center justify-center">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-sm truncate">{testimonial.name}</h4>
                      <p className="text-xs text-gray-600 truncate">{testimonial.title}</p>
                      <p className="text-xs text-gray-500 truncate">{testimonial.company}</p>
                    </div>
                    <Linkedin className="w-4 h-4 text-[rgb(2,54,125)] flex-shrink-0" />
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-gray-700 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollHorizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}