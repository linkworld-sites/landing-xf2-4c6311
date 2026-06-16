"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function DealerSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const prefersReduced = useReducedMotion();

  return (
    <section id="dealer" ref={ref} className="bg-surface/20 border-t border-border py-16 px-6">
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <p className="font-body text-text-secondary text-sm sm:text-base">
          Run a foil school or operate a watersports shop?{" "}
          <span className="text-text-primary">Wholesale pricing available.</span>
        </p>

        <motion.a
          href="mailto:dealers@xf2.io"
          whileHover="hover"
          whileTap={{ scale: 0.97 }}
          className="relative shrink-0 inline-flex items-center gap-2 border border-border text-text-secondary font-display font-semibold text-sm tracking-widest uppercase px-7 py-3.5 rounded-lg overflow-hidden hover:border-accent hover:text-accent transition-colors duration-300"
          style={{ borderRadius: "8px" }}
        >
          Become a Dealer
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}
