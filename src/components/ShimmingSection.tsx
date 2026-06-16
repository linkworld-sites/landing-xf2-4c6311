"use client";

import { useState, useRef } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";

interface Shim {
  id: string;
  angle: number;
  label: string;
  desc: string;
  color: string;
  yOffset: number;
}

const shims: Shim[] = [
  {
    id: "base",
    angle: 0,
    label: "Base Plate",
    desc: "Primary mounting surface. Machined flat to ±0.05mm.",
    color: "#00D4FF",
    yOffset: 0,
  },
  {
    id: "shim1",
    angle: 1,
    label: "1° Shim",
    desc: "Slight forward lean. Improves upwind performance on flat water.",
    color: "#C8A96E",
    yOffset: -8,
  },
  {
    id: "shim2",
    angle: 2,
    label: "2° Shim",
    desc: "Neutral stance. The most popular angle for wingfoil and kitefoil.",
    color: "#C8A96E",
    yOffset: -16,
  },
  {
    id: "shim3",
    angle: 3,
    label: "3° Shim",
    desc: "Rearward bias. Lowers takeoff speed. Preferred for surf foil.",
    color: "#C8A96E",
    yOffset: -24,
  },
];

export default function ShimmingSection() {
  const [active, setActive] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const prefersReduced = useReducedMotion();

  const activeShim = shims.find((s) => s.id === active);

  return (
    <section className="bg-surface/30 py-24 sm:py-32 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 lg:flex lg:items-end lg:justify-between"
        >
          <div>
            <span className="text-accent text-xs tracking-[0.3em] uppercase font-body block mb-4">
              Precision Tuning
            </span>
            <h2 className="font-display text-5xl sm:text-6xl font-bold uppercase text-text-primary tracking-tight">
              Baseplate
              <br />
              Shimming
            </h2>
          </div>
          <p className="text-text-secondary font-body text-sm max-w-xs mt-6 lg:mt-0 lg:text-right leading-relaxed">
            Hover the diagram to explore angle adjustments.
            Each shim is precision-ground to 0.1° tolerance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Isometric SVG diagram */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <svg viewBox="0 0 400 320" className="w-full h-auto" style={{ overflow: "visible" }}>
              <defs>
                <filter id="shimGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Grid */}
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={i} x1={40 + i * 40} y1={30} x2={40 + i * 40} y2={290} stroke="#1E2028" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 7 }).map((_, i) => (
                <line key={i} x1={40} y1={50 + i * 40} x2={360} y2={50 + i * 40} stroke="#1E2028" strokeWidth="0.5" />
              ))}

              {/* Mast cross section */}
              <motion.rect
                x="170"
                y="40"
                width="60"
                height="100"
                rx="4"
                fill="#111318"
                stroke="#00D4FF"
                strokeWidth="1.5"
                whileHover={{ filter: "brightness(1.2)" }}
              />
              <text x="200" y="100" textAnchor="middle" fill="#6B7280" fontSize="9" fontFamily="monospace">MAST</text>

              {/* Shim layers — isometric cross section */}
              {shims.map((shim, idx) => {
                const isActive = active === shim.id;
                const y = 165 + idx * 22;
                const skewAngle = shim.angle * 3;

                return (
                  <motion.g
                    key={shim.id}
                    onHoverStart={() => setActive(shim.id)}
                    onHoverEnd={() => setActive(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Top face */}
                    <motion.rect
                      x={80}
                      y={y}
                      width={240}
                      height={18}
                      rx="2"
                      fill={isActive ? `${shim.color}22` : "#111318"}
                      stroke={isActive ? shim.color : "#1E2028"}
                      strokeWidth={isActive ? "1.5" : "1"}
                      animate={{ fill: isActive ? `${shim.color}22` : "#111318" }}
                      transition={{ duration: 0.2 }}
                    />
                    {/* Angle indicator line */}
                    {shim.angle > 0 && (
                      <line
                        x1={88}
                        y1={y + 9}
                        x2={88 + skewAngle * 4}
                        y2={y + 9 + skewAngle * 2}
                        stroke={shim.color}
                        strokeWidth="1"
                        opacity={isActive ? 0.8 : 0.3}
                      />
                    )}
                    {/* Label */}
                    <text
                      x={200}
                      y={y + 12}
                      textAnchor="middle"
                      fill={isActive ? shim.color : "#6B7280"}
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {shim.label} {shim.angle > 0 ? `+${shim.angle}°` : ""}
                    </text>
                    {/* Hover zone leader line */}
                    {isActive && (
                      <g>
                        <line
                          x1={320}
                          y1={y + 9}
                          x2={370}
                          y2={y + 9}
                          stroke={shim.color}
                          strokeWidth="0.75"
                          strokeDasharray="3 2"
                        />
                        <circle cx={322} cy={y + 9} r="2" fill={shim.color} />
                      </g>
                    )}
                  </motion.g>
                );
              })}

              {/* Board surface */}
              <rect x="60" y="255" width="280" height="28" rx="4" fill="#111318" stroke="#1E2028" strokeWidth="1" />
              <text x="200" y="273" textAnchor="middle" fill="#6B7280" fontSize="9" fontFamily="monospace">BOARD DECK</text>

              {/* Dimension arrows */}
              <line x1="50" y1="165" x2="50" y2="255" stroke="#1E2028" strokeWidth="0.75" strokeDasharray="2 2" />
              <path d="M47 168 L50 162 L53 168" fill="#1E2028" />
              <path d="M47 252 L50 258 L53 252" fill="#1E2028" />
              <text x="44" y="212" fill="#6B7280" fontSize="8" fontFamily="monospace" textAnchor="middle" transform="rotate(-90, 44, 212)">SHIM STACK</text>
            </svg>
          </motion.div>

          {/* Tooltip / info panel */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              {activeShim ? (
                <motion.div
                  key={activeShim.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="border border-border rounded-xl p-6 bg-surface"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: activeShim.color }}
                    />
                    <span className="font-display text-lg font-bold uppercase text-text-primary tracking-wide">
                      {activeShim.label}
                    </span>
                    {activeShim.angle > 0 && (
                      <span className="text-accent font-mono text-sm ml-auto">
                        +{activeShim.angle}°
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary font-body text-sm leading-relaxed">
                    {activeShim.desc}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border border-border/40 rounded-xl p-6 bg-surface/40"
                >
                  <p className="font-display text-2xl sm:text-3xl font-bold text-text-primary uppercase mb-4">
                    Fine-tune your foil.
                  </p>
                  <p className="text-text-secondary font-body text-sm leading-relaxed mb-6">
                    Each MastLOCK ships with a full shim kit. Three angles.
                    Two minutes to swap. Infinite fine-tuning.
                  </p>
                  <div className="space-y-2">
                    {shims.slice(1).map((s) => (
                      <div key={s.id} className="flex items-center gap-3">
                        <div className="w-4 h-px bg-gold" />
                        <span className="text-text-secondary text-xs font-mono">
                          {s.label} (+{s.angle}°) — {s.desc.split(".")[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
