"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export default function VideoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ["0%", "0%"] : ["-8%", "8%"]
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-canvas"
      style={{ minHeight: "90vh" }}
    >
      {/* Parallax visual container */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[115%] -top-[7.5%]"
      >
        {/* Abstract slow-motion water visual — intentional design art */}
        <svg
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="waterGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0A0B0D" stopOpacity="0" />
            </radialGradient>
            <filter id="blur4">
              <feGaussianBlur stdDeviation="4" />
            </filter>
            <filter id="blur8">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            {/* Water bead refraction */}
            <radialGradient id="bead1" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#F0F2F5" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#00D4FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="bead2" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#F0F2F5" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#00D4FF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background fill */}
          <rect width="1440" height="800" fill="#0A0B0D" />

          {/* Surface plane — aluminum with CNC texture */}
          <rect x="0" y="340" width="1440" height="460" fill="#111318" />
          {/* Texture lines */}
          {Array.from({ length: 28 }).map((_, i) => (
            <line
              key={i}
              x1={0}
              y1={360 + i * 15}
              x2={1440}
              y2={360 + i * 15}
              stroke="#1E2028"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 48 }).map((_, i) => (
            <line
              key={i}
              x1={i * 30}
              y1={340}
              x2={i * 30}
              y2={800}
              stroke="#1E2028"
              strokeWidth="0.3"
            />
          ))}

          {/* Rim light on surface edge */}
          <rect x="0" y="338" width="1440" height="2" fill="url(#waterGlow)" filter="url(#blur4)" />
          <rect x="0" y="336" width="1440" height="8" fill="#00D4FF" opacity="0.06" />

          {/* Radial glow from mechanism center */}
          <ellipse cx="720" cy="340" rx="600" ry="200" fill="url(#waterGlow)" />

          {/* Water beads */}
          {[
            { x: 580, y: 360, r: 18, g: "bead1" },
            { x: 640, y: 380, r: 12, g: "bead2" },
            { x: 720, y: 355, r: 22, g: "bead1" },
            { x: 790, y: 375, r: 14, g: "bead2" },
            { x: 860, y: 358, r: 19, g: "bead1" },
            { x: 520, y: 392, r: 10, g: "bead2" },
            { x: 680, y: 402, r: 8, g: "bead2" },
            { x: 760, y: 398, r: 11, g: "bead1" },
            { x: 820, y: 388, r: 7, g: "bead2" },
            { x: 910, y: 370, r: 16, g: "bead2" },
          ].map((bead, i) => (
            <g key={i}>
              <ellipse
                cx={bead.x}
                cy={bead.y}
                rx={bead.r}
                ry={bead.r * 0.7}
                fill={`url(#${bead.g})`}
                filter={bead.r > 15 ? "url(#blur4)" : undefined}
              />
              {/* Highlight */}
              <ellipse
                cx={bead.x - bead.r * 0.25}
                cy={bead.y - bead.r * 0.2}
                rx={bead.r * 0.3}
                ry={bead.r * 0.2}
                fill="white"
                opacity="0.7"
              />
            </g>
          ))}

          {/* Hand silhouette reaching in from left */}
          <path
            d="M0 420 C80 360 140 340 200 355 C230 362 240 370 250 380 C260 390 255 400 245 408 C280 395 310 390 320 400 C335 412 325 425 310 430 C340 420 365 420 370 432 C378 448 360 458 340 460 C365 454 380 458 380 472 C380 490 355 496 330 494 L200 500 C150 502 100 490 60 480 Z"
            fill="#111318"
            stroke="#1E2028"
            strokeWidth="1"
          />
          {/* Finger highlight */}
          <path
            d="M200 355 C220 350 245 360 250 380"
            stroke="#1E2028"
            strokeWidth="1.5"
            fill="none"
          />

          {/* MastLOCK mechanism SVG on surface */}
          <g transform="translate(620, 280)">
            <rect x="0" y="0" width="200" height="60" rx="8" fill="#111318" stroke="#00D4FF" strokeWidth="1.5" />
            <rect x="60" y="-40" width="80" height="40" rx="6" fill="#111318" stroke="#00D4FF" strokeWidth="1.5" />
            <path d="M80 -40 L100 -65 L120 -40" fill="#111318" stroke="#00D4FF" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="100" cy="30" r="12" fill="none" stroke="#00D4FF" strokeWidth="1.5" />
            <circle cx="100" cy="30" r="5" fill="#00D4FF" opacity="0.6" />
            {/* Click spark */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <line
                key={a}
                x1={100 + 14 * Math.cos((a * Math.PI) / 180)}
                y1={30 + 14 * Math.sin((a * Math.PI) / 180)}
                x2={100 + 22 * Math.cos((a * Math.PI) / 180)}
                y2={30 + 22 * Math.sin((a * Math.PI) / 180)}
                stroke="#00D4FF"
                strokeWidth="1"
                opacity="0.4"
              />
            ))}
          </g>
        </svg>
      </motion.div>

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] pointer-events-none">
        {/* Time counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="font-display text-[clamp(5rem,18vw,14rem)] font-bold leading-none text-text-primary tracking-tight">
            0.4
          </span>
          <div className="text-accent font-display text-2xl sm:text-3xl font-semibold tracking-widest uppercase mt-2">
            seconds.
          </div>
          <div className="flex items-center gap-4 mt-6 justify-center">
            <div className="h-px w-12 bg-accent/40" />
            <p className="font-body text-text-secondary text-sm tracking-widest uppercase">
              One hand. Zero tools.
            </p>
            <div className="h-px w-12 bg-accent/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
