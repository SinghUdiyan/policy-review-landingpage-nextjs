"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/about", label: "About Us" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#features", label: "Features" },
    { href: "/naitri", label: "Naitri" },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
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
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <span className="text-2xl font-bold text-gray-900 hidden">PolicyReview</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center justify-center flex-1">
              <div className="flex items-center gap-12">
                {navItems.map((item) => (
                  item.href.startsWith('#') ? (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-gray-700 text-base font-medium hover:text-gray-900 transition-all duration-300 relative group cursor-pointer"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-gray-700 text-base font-medium hover:text-gray-900 transition-all duration-300 relative group cursor-pointer"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button className="btn-outline text-sm px-6 py-2">
                Login
              </button>
              <Link
                href="/review"
                className="btn-primary text-sm px-6 py-2"
              >
                Review My Policy - FREE
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <Image 
                src="/Logo.png" 
                alt="PolicyReview" 
                width={240}
                height={240}
                className="h-8 w-auto"
                priority
                quality={100}
                style={{ objectFit: 'contain' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <span className="text-xl font-bold text-gray-900 hidden">PolicyReview</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <button className="btn-outline text-xs px-4 py-2">
                Login
              </button>
              <Link
                href="/review"
                className="btn-primary text-xs px-4 py-2"
              >
                Review FREE
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="py-6 border-t border-gray-100 bg-white/95 backdrop-blur-md">
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  item.href.startsWith('#') ? (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-700 hover:text-gray-900 transition-colors py-3 px-4 font-medium"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-700 hover:text-gray-900 transition-colors py-3 px-4 font-medium"
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  );
}
