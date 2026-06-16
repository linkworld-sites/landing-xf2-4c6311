"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";

export default function Loader() {
  const [phase, setPhase] = useState<"parts" | "assembled" | "done">("parts");
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setPhase("done");
      return;
    }
    const t1 = setTimeout(() => setPhase("assembled"), 700);
    const t2 = setTimeout(() => setPhase("done"), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-canvas"
        >
          {/* MastLOCK SVG line-art animation */}
          <motion.svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            className="mb-8"
          >
            {/* Base plate */}
            <motion.rect
              x="20"
              y="80"
              width="80"
              height="16"
              rx="4"
              stroke="#00D4FF"
              strokeWidth="1.5"
              initial={prefersReduced ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.0, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Mast collar */}
            <motion.rect
              x="36"
              y="44"
              width="48"
              height="36"
              rx="6"
              stroke="#00D4FF"
              strokeWidth="1.5"
              initial={prefersReduced ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Guide rails */}
            <motion.line
              x1="40"
              y1="80"
              x2="40"
              y2="44"
              stroke="#00D4FF"
              strokeWidth="1"
              strokeDasharray="3 3"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
            <motion.line
              x1="80"
              y1="80"
              x2="80"
              y2="44"
              stroke="#00D4FF"
              strokeWidth="1"
              strokeDasharray="3 3"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
            {/* Cam lever */}
            <motion.path
              d="M44 44 L60 24 L76 44"
              stroke="#00D4FF"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={prefersReduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Lock pin — clicks into place */}
            <motion.circle
              cx="60"
              cy="62"
              r="6"
              stroke="#00D4FF"
              strokeWidth="1.5"
              fill={phase === "assembled" ? "#00D4FF22" : "none"}
              initial={prefersReduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              animate={
                phase === "assembled"
                  ? { scale: [0, 1.3, 1], opacity: 1 }
                  : { scale: 0, opacity: 0 }
              }
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Click spark lines */}
            {phase === "assembled" && (
              <>
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <motion.line
                    key={angle}
                    x1={60 + 8 * Math.cos((angle * Math.PI) / 180)}
                    y1={62 + 8 * Math.sin((angle * Math.PI) / 180)}
                    x2={60 + 16 * Math.cos((angle * Math.PI) / 180)}
                    y2={62 + 16 * Math.sin((angle * Math.PI) / 180)}
                    stroke="#00D4FF"
                    strokeWidth="1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                  />
                ))}
              </>
            )}
          </motion.svg>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={phase === "assembled" ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <span className="font-display text-3xl font-bold tracking-[0.4em] text-text-primary uppercase">
              MASTLOCK
            </span>
            <div className="flex items-center gap-3 mt-2 justify-center">
              <div className="h-px w-8 bg-accent/40" />
              <span className="text-accent text-xs tracking-widest uppercase font-body">by XF2</span>
              <div className="h-px w-8 bg-accent/40" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
