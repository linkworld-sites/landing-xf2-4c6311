"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { href: "#mechanism", label: "Mechanism" },
  { href: "#shop", label: "Shop" },
  { href: "#dealer", label: "Dealers" },
  { href: "/blog", label: "Journal" },
];

const legalLinks = [
  { href: "/legal/impressum", label: "Impressum" },
  { href: "/legal/datenschutz", label: "Datenschutz" },
  { href: "/legal/cookies", label: "Cookies" },
];

const socialLinks = [
  { href: "https://instagram.com/xf2official", label: "Instagram" },
  { href: "https://youtube.com/@xf2official", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-canvas border-t border-border py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Three columns */}
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          {/* Col 1 — Brand + Nav */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="8" width="24" height="16" rx="3" stroke="#00D4FF" strokeWidth="1.5" fill="none"/>
                <path d="M9 8V6a5 5 0 0 1 10 0v2" stroke="#00D4FF" strokeWidth="1.5" fill="none"/>
                <circle cx="14" cy="16" r="2.5" fill="#00D4FF"/>
                <path d="M14 18.5V21" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="font-display font-bold text-lg tracking-widest text-text-primary uppercase">
                XF2
              </span>
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <motion.div key={link.href} whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary text-sm font-body transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Col 2 — Journal */}
          <div>
            <p className="text-text-secondary text-xs tracking-widest uppercase font-body mb-6">
              Journal
            </p>
            <div className="flex flex-col gap-2">
              <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                <Link href="/blog" className="text-text-secondary hover:text-text-primary text-sm font-body transition-colors">
                  Latest Posts
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                <Link href="/blog/mastlock-launch" className="text-text-secondary hover:text-text-primary text-sm font-body transition-colors">
                  Introducing MastLOCK
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Col 3 — Contact + Social */}
          <div>
            <p className="text-text-secondary text-xs tracking-widest uppercase font-body mb-6">
              Contact
            </p>
            <div className="flex flex-col gap-2 mb-6">
              <a
                href="mailto:hello@xf2.io"
                className="text-text-secondary hover:text-accent text-sm font-body transition-colors"
              >
                hello@xf2.io
              </a>
            </div>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <motion.div key={link.href} whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary text-sm font-body transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-border mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-xs font-body">
            © {new Date().getFullYear()} XF2. All rights reserved.
          </p>
          <nav className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-text-primary text-xs font-body transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
