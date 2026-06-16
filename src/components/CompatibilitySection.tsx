"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const brands = [
  "Slingshot",
  "Cabrinha",
  "North",
  "Duotone",
  "Ozone",
  "Mystic",
  "Fanatic",
  "F-One",
  "Lift Foils",
  "Axis Foils",
  "Moses",
  "Uni.com",
  "Sabfoil",
  "Liquid Force",
  "Naish",
  "Armstrong",
];

function TerminalLine({
  text,
  delay,
}: {
  text: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReduced = useReducedMotion();

  const chars = text.split("");

  return (
    <div ref={ref} className="flex items-center gap-3 py-1.5 border-b border-border/30 last:border-0">
      <span className="text-accent/40 font-mono text-xs select-none">$</span>
      <span className="font-mono text-sm text-text-primary tracking-wide">
        {prefersReduced ? (
          text
        ) : (
          chars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: delay + i * 0.02, duration: 0 }}
            >
              {char}
            </motion.span>
          ))
        )}
      </span>
      {inView && !prefersReduced && (
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: delay + chars.length * 0.02 + 0.2, duration: 0 }}
          className="text-accent font-mono"
        >
          _
        </motion.span>
      )}
    </div>
  );
}

export default function CompatibilitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-canvas py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="text-accent text-xs tracking-[0.3em] uppercase font-body block mb-4">
            Compatibility
          </span>
          <h2 className="font-display text-5xl sm:text-6xl font-bold uppercase text-text-primary tracking-tight mb-4">
            Every Brand.
          </h2>
          <p className="text-text-secondary font-body text-sm tracking-widest uppercase">
            100% brand agnostic.
          </p>
        </motion.div>

        {/* Terminal panel */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="bg-surface border border-border rounded-xl overflow-hidden"
        >
          {/* Terminal header bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-2">
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="ml-3 font-mono text-xs text-text-secondary/60">
              mastlock --list-compatible
            </span>
          </div>

          <div className="p-6">
            {/* Boot line */}
            <motion.p
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="font-mono text-xs text-text-secondary/60 mb-4"
            >
              Loading compatibility database v2.4.1...{" "}
              <span className="text-accent">OK</span>
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-x-12">
              {brands.map((brand, i) => (
                <TerminalLine
                  key={brand}
                  text={brand}
                  delay={0.4 + i * 0.06}
                />
              ))}
            </div>

            {/* Footer line */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + brands.length * 0.06 + 0.3 }}
              className="mt-6 pt-4 border-t border-border/40 flex items-center gap-2"
            >
              <span className="font-mono text-xs text-accent">✓</span>
              <span className="font-mono text-xs text-text-secondary">
                {brands.length} brands verified · more added continuously
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Sub-copy */}
        <motion.p
          initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-text-secondary font-body text-sm mt-8"
        >
          Standard US base plate pattern. If your foil uses a US box, MastLOCK fits.
        </motion.p>
      </div>
    </section>
  );
}
