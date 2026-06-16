"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "#mechanism", label: "Mechanism" },
  { href: "#shop", label: "Shop" },
  { href: "/blog", label: "Journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-canvas/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="8" width="24" height="16" rx="3" stroke="#00D4FF" strokeWidth="1.5" fill="none"/>
              <path d="M9 8V6a5 5 0 0 1 10 0v2" stroke="#00D4FF" strokeWidth="1.5" fill="none"/>
              <circle cx="14" cy="16" r="2.5" fill="#00D4FF"/>
              <path d="M14 18.5V21" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="font-display font-bold text-xl tracking-widest text-text-primary uppercase">
              XF2
            </span>
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.div key={link.href} whileHover={{ y: -1 }} whileTap={{ y: 0 }}>
              <Link
                href={link.href}
                className="text-text-secondary hover:text-text-primary text-sm tracking-widest uppercase font-display font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <motion.a
            href="#dealer"
            whileHover={{ backgroundColor: "#00D4FF", color: "#0A0B0D" }}
            whileTap={{ scale: 0.96 }}
            className="border border-accent text-accent text-sm tracking-widest uppercase font-display font-semibold px-5 py-2 rounded-lg transition-colors duration-300"
            style={{ borderRadius: "8px" }}
          >
            Dealer
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-text-secondary hover:text-text-primary p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block h-px bg-current"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px bg-current"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block h-px bg-current"
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden overflow-hidden bg-surface border-b border-border"
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-text-secondary hover:text-text-primary text-sm tracking-widest uppercase font-display font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#dealer"
            onClick={() => setMobileOpen(false)}
            className="border border-accent text-accent text-sm tracking-widest uppercase font-display font-semibold px-5 py-2.5 rounded-lg text-center"
          >
            Dealer
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
