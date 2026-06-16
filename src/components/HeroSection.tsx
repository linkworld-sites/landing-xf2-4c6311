"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { track } from "@/lib/funnel";

const words = ["CLICK", "IN.", "RIDE.", "RELEASE."];

export default function HeroSection() {
  const prefersReduced = useReducedMotion();

  const wordVariant = {
    hidden: { clipPath: "inset(100% 0 0 0)", opacity: 0 },
    visible: (i: number) => ({
      clipPath: "inset(0% 0 0 0)",
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 1.5 + i * 0.12,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-canvas pt-16">
      {/* Rim-light background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      {/* Product image — floating */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className={`relative w-full max-w-lg mx-auto mb-8 px-8 ${prefersReduced ? "" : "animate-float"}`}
        style={prefersReduced ? {} : { animation: "float 4s ease-in-out infinite" }}
      >
        <Image
          src="/images/hero.png"
          alt="MastLOCK — precision foil mast mounting system"
          width={640}
          height={480}
          priority
          className="w-full h-auto object-contain drop-shadow-[0_0_60px_rgba(0,212,255,0.15)]"
        />
        {/* Rim light edge */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-transparent to-accent/5 pointer-events-none" />
      </motion.div>

      {/* Headline */}
      <div className="text-center px-6 mb-8">
        <h1 className="font-display font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight uppercase flex flex-wrap justify-center gap-x-5 gap-y-1">
          {words.map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={prefersReduced ? undefined : wordVariant}
              initial={prefersReduced ? "visible" : "hidden"}
              animate="visible"
              className={i === 0 ? "text-text-primary" : "text-accent"}
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </div>

      {/* Subline */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
        className="text-text-secondary text-sm sm:text-base tracking-widest uppercase font-body text-center mb-10 px-6"
      >
        0.4 seconds. One hand. Zero tools.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 2.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.a
          href="#shop"
          onClick={() => track("intent")}
          whileHover="hover"
          whileTap={{ scale: 0.97 }}
          className="relative inline-flex items-center gap-3 border border-accent text-accent font-display font-semibold text-sm tracking-widest uppercase px-10 py-4 rounded-lg overflow-hidden group"
          style={{ borderRadius: "8px" }}
        >
          <motion.span
            className="absolute inset-0 bg-accent origin-left"
            variants={{
              hover: { scaleX: 1 },
            }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
          <motion.span
            className="relative z-10 transition-colors duration-300 group-hover:text-canvas"
          >
            Shop MastLOCK
          </motion.span>
          <motion.svg
            className="relative z-10 transition-colors duration-300 group-hover:text-canvas"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        </motion.a>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-secondary text-xs tracking-widest uppercase font-body">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-accent/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
