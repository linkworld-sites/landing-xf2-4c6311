"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

const painPoints = [
  "Four screws. Every session.",
  "Sand. Saltwater. Stripped threads.",
  "A wrench you left in the van.",
  "Five minutes. Every time. Forever.",
];

export default function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const prefersReduced = useReducedMotion();

  return (
    <section ref={ref} className="relative min-h-screen bg-canvas overflow-hidden">
      {/* Section label */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center">
        <span className="text-text-secondary text-xs tracking-[0.3em] uppercase font-body">
          The old way
        </span>
      </div>

      <div className="h-full min-h-screen grid lg:grid-cols-2">
        {/* Left — old reality (desaturated, problem) */}
        <div className="relative flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-24 border-r border-border/40">
          {/* Grainy overlay */}
          <div className="absolute inset-0 bg-text-secondary/3 mix-blend-multiply pointer-events-none"
               style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")" }} />

          <div className="relative max-w-lg">
            <motion.h2
              initial={prefersReduced ? {} : { opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-text-secondary mb-3"
            >
              Screws are a{" "}
              <span className="line-through decoration-1 decoration-text-secondary/60">thing</span>
            </motion.h2>
            <motion.h2
              initial={prefersReduced ? {} : { opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-text-secondary mb-10"
            >
              of the past.
            </motion.h2>

            <div className="space-y-5">
              {painPoints.map((point, i) => (
                <motion.div
                  key={point}
                  initial={prefersReduced ? {} : { opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 shrink-0 w-4 h-4 rounded-full border border-text-secondary/30 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-secondary/50" />
                  </span>
                  <p className="font-body text-text-secondary text-base leading-relaxed">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Image — desaturated process photo */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={inView ? { opacity: 0.5 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-10 relative"
            >
              <Image
                src="/images/process.png"
                alt="Traditional foil mast mounting with screws"
                width={480}
                height={320}
                className="w-full h-48 object-cover rounded-xl grayscale brightness-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas to-transparent rounded-xl" />
            </motion.div>
          </div>
        </div>

        {/* Right — MastLOCK solution (crisp, lit) */}
        <div className="relative flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-24 bg-surface/30">
          {/* Accent glow */}
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-accent/8 rounded-full blur-[80px] pointer-events-none -translate-y-1/2" />

          <div className="relative max-w-lg">
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <Image
                src="/images/detail.png"
                alt="MastLOCK precision mechanism — crisp studio shot"
                width={480}
                height={320}
                className="w-full h-56 object-cover rounded-xl"
                style={{ filter: "drop-shadow(0 0 40px rgba(0,212,255,0.15))" }}
              />
            </motion.div>

            <motion.h2
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-text-primary mb-4"
            >
              Engineered down to{" "}
              <span className="text-accent">every millimeter.</span>
            </motion.h2>

            <motion.p
              initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-text-secondary font-body text-base leading-relaxed"
            >
              MastLOCK replaces the entire screw system with a single
              cam-lock mechanism. Precision-machined from aerospace aluminum.
              No play. No rattle. No compromise.
            </motion.p>

            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              {[
                { value: "0.4s", label: "Mount time" },
                { value: "1", label: "Hand required" },
                { value: "0", label: "Tools needed" },
              ].map((stat) => (
                <div key={stat.label} className="border border-border/60 rounded-lg p-4 bg-surface/50">
                  <div className="font-display text-2xl font-bold text-accent">{stat.value}</div>
                  <div className="text-text-secondary text-xs tracking-wider uppercase font-body mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
