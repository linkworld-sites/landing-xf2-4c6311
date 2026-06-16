"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface Part {
  id: string;
  label: string;
  spec: string;
  path: string;
  cx: number;
  cy: number;
  dx: number;
  dy: number;
  labelX: number;
  labelY: number;
  threshold: number;
}

const parts: Part[] = [
  {
    id: "baseplate",
    label: "Aluminium Base Plate",
    spec: "6061-T6 · 3mm",
    path: "M20 88 L100 88 L100 96 Q100 100 96 100 L24 100 Q20 100 20 96 Z",
    cx: 60,
    cy: 94,
    dx: 0,
    dy: 40,
    labelX: 110,
    labelY: 94,
    threshold: 0.08,
  },
  {
    id: "collar",
    label: "Mast Collar",
    spec: "Anodised · 52mm ID",
    path: "M36 52 L84 52 L84 88 L36 88 Z",
    cx: 60,
    cy: 70,
    dx: 0,
    dy: 20,
    labelX: 110,
    labelY: 68,
    threshold: 0.22,
  },
  {
    id: "cam",
    label: "Cam Lever",
    spec: "Stainless · 0.4s release",
    path: "M48 52 L60 28 L72 52 Z",
    cx: 60,
    cy: 42,
    dx: -20,
    dy: -20,
    labelX: -40,
    labelY: 36,
    threshold: 0.38,
  },
  {
    id: "pin",
    label: "Locking Pin",
    spec: "Ti-Grade 5 · Ø8mm",
    path: "M53 62 L67 62 L67 78 L53 78 Z",
    cx: 60,
    cy: 70,
    dx: 28,
    dy: 0,
    labelX: 110,
    labelY: 70,
    threshold: 0.52,
  },
  {
    id: "spring",
    label: "Return Spring",
    spec: "Stainless · 12N/mm",
    path: "M56 30 Q60 26 64 30 Q68 34 64 38 Q60 42 56 38 Q52 34 56 30",
    cx: 60,
    cy: 34,
    dx: 24,
    dy: -24,
    labelX: 110,
    labelY: 32,
    threshold: 0.66,
  },
  {
    id: "seal",
    label: "Silicone Seal",
    spec: "Shore 50 · IP68",
    path: "M36 88 L84 88 L84 92 L36 92 Z",
    cx: 60,
    cy: 90,
    dx: -30,
    dy: 16,
    labelX: -40,
    labelY: 90,
    threshold: 0.78,
  },
];

function PartComponent({
  part,
  scrollProgress,
}: {
  part: Part;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const tx = useTransform(
    scrollProgress,
    [part.threshold, part.threshold + 0.12, 0.85, 0.95],
    [0, part.dx, part.dx, 0]
  );
  const ty = useTransform(
    scrollProgress,
    [part.threshold, part.threshold + 0.12, 0.85, 0.95],
    [0, part.dy, part.dy, 0]
  );
  const labelOpacity = useTransform(
    scrollProgress,
    [part.threshold + 0.1, part.threshold + 0.18, 0.82, 0.88],
    [0, 1, 1, 0]
  );
  const labelX = useTransform(
    scrollProgress,
    [part.threshold + 0.1, part.threshold + 0.18],
    [part.labelX > 60 ? part.labelX + 16 : part.labelX - 16, part.labelX]
  );

  return (
    <g>
      <motion.g style={{ x: tx, y: ty }}>
        <motion.path
          d={part.path}
          fill="rgba(0,212,255,0.06)"
          stroke="#00D4FF"
          strokeWidth="1.2"
        />
      </motion.g>

      {/* Leader line + label */}
      <motion.g style={{ opacity: labelOpacity }}>
        <motion.line
          x1={part.cx + (part.labelX > 60 ? 14 : -14)}
          y1={part.cy}
          x2={part.labelX > 60 ? part.labelX - 2 : part.labelX + 2}
          y2={part.labelY}
          stroke="#00D4FF"
          strokeWidth="0.75"
          strokeDasharray="3 3"
          className="leader-line"
        />
        <motion.foreignObject
          x={part.labelX > 60 ? part.labelX : part.labelX - 96}
          y={part.labelY - 18}
          width="96"
          height="44"
        >
          <div className="text-left">
            <p className="text-accent font-display text-xs font-semibold uppercase leading-tight">
              {part.label}
            </p>
            <p className="text-text-secondary font-mono text-[10px] mt-0.5">
              {part.spec}
            </p>
          </div>
        </motion.foreignObject>
      </motion.g>
    </g>
  );
}

export default function MechanismSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const assembleOpacity = useTransform(
    scrollYProgress,
    [0.9, 1.0],
    [0, 1]
  );

  if (prefersReduced) {
    return (
      <section id="mechanism" className="bg-canvas py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl font-bold uppercase text-text-primary mb-6">
            The Mechanism
          </h2>
          <p className="text-text-secondary font-body mb-12 max-w-lg mx-auto">
            Six precision components. One cam-lock action. Engineered down to
            every millimeter.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {parts.map((p) => (
              <div key={p.id} className="border border-border rounded-lg p-4 bg-surface">
                <p className="text-accent font-display text-sm font-semibold uppercase mb-1">{p.label}</p>
                <p className="text-text-secondary font-mono text-xs">{p.spec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="mechanism"
      ref={containerRef}
      className="relative"
      style={{ height: "700vh" }}
    >
      {/* Section label */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-canvas">
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Header */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
          <span className="text-text-secondary text-xs tracking-[0.3em] uppercase font-body">
            Scroll to disassemble
          </span>
        </div>

        {/* SVG Mechanism */}
        <div className="relative w-full max-w-2xl px-4 sm:px-16">
          <svg
            viewBox="-40 10 200 100"
            className="w-full h-auto overflow-visible"
            style={{ minHeight: "280px" }}
          >
            {parts.map((part) => (
              <PartComponent
                key={part.id}
                part={part}
                scrollProgress={scrollYProgress}
              />
            ))}
          </svg>
        </div>

        {/* "Assembled" label fades in at end */}
        <motion.div
          style={{ opacity: assembleOpacity }}
          className="absolute bottom-24 text-center"
        >
          <p className="font-display text-2xl font-bold text-accent uppercase tracking-widest">
            Assembled.
          </p>
          <p className="text-text-secondary text-sm font-body mt-2">
            The same mount. Every time. For every board.
          </p>
        </motion.div>

        {/* Section headline */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center px-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-text-primary tracking-tight">
            The Mechanism
          </h2>
        </div>
      </div>
    </section>
  );
}
