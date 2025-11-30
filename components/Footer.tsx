"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {


  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, var(--teal-9) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, var(--gray-9) 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <Image 
                  src="/Logo.png" 
                  alt="PolicyReview" 
                  width={40}
                  height={40}
                  className="h-10 w-auto mr-3"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <span className="text-2xl font-bold text-white hidden">PolicyReview</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                India&apos;s leading platform for transparent insurance policy analysis. Get unbiased reviews, compare returns, and make informed financial decisions.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://placeholder-link.com/facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-teal-600 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a
                  href="https://placeholder-link.com/twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-teal-600 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a
                  href="https://placeholder-link.com/linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-teal-600 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-teal-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <a href="#how-it-works" className="text-gray-300 hover:text-teal-400 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-gray-300 hover:text-teal-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <Link href="/naitri" className="text-gray-300 hover:text-teal-400 transition-colors">
                    Naitri
                  </Link>
                </li>
                <li>
                  <a href="#faq" className="text-gray-300 hover:text-teal-400 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <Link href="/review" className="text-gray-300 hover:text-teal-400 transition-colors">
                    Review My Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Legal */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Contact & Legal</h3>
              <div className="space-y-3 text-gray-300">
                <p>
                  <strong className="text-white">Email:</strong><br />
                  support@policyreview.co.in
                </p>
                <p>
                  <strong className="text-white">Phone:</strong><br />
                  +91 98765 43210
                </p>
                <p>
                  <strong className="text-white">Address:</strong><br />
                  Mumbai, Maharashtra, India
                </p>
                <div className="pt-4">
                  <a href="https://placeholder-link.com/privacy" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                    Privacy Policy
                  </a>
                  <span className="mx-2 text-gray-500">•</span>
                  <a href="https://placeholder-link.com/terms" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 PolicyReview.co.in. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm">
              <strong className="text-white">Disclaimer:</strong> PolicyReview is an independent platform. 
              We are not affiliated with any insurance company. All analysis is for educational purposes only.
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-16 h-16 bg-teal-500 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-500 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </footer>
  );
}
