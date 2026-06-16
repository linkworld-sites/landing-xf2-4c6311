"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";

const testimonials = [
  {
    quote:
      "I've been rigging foils for eight years. MastLOCK changed my morning routine — from a five-minute setup to something I genuinely don't think about. It's not a product, it's a decision I should have made sooner.",
    name: "Markus H.",
    discipline: "Kitefoil / Racing",
    verified: true,
  },
  {
    quote:
      "Ran three sessions back-to-back last weekend. Switched between a surf foil and wing setup in under a minute. The same mount. Every time. I trust it completely.",
    name: "Sara L.",
    discipline: "Wingfoil / Freeride",
    verified: true,
  },
  {
    quote:
      "I run a foil school. My students used to waste half their lesson time fighting their equipment. Now they're on the water. MastLOCK pays for itself in the first session.",
    name: "Pedro V.",
    discipline: "Foil Instructor / Portugal",
    verified: true,
  },
];

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    prefersReduced ? ["0%", "0%"] : ["5%", "-55%"]
  );

  return (
    <section className="bg-canvas py-24 sm:py-32 overflow-hidden">
      {/* Header */}
      <div ref={titleRef} className="px-6 max-w-7xl mx-auto mb-12">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-accent text-xs tracking-[0.3em] uppercase font-body block mb-4">
            From the Riders
          </span>
          <h2 className="font-display text-5xl sm:text-6xl font-bold uppercase text-text-primary tracking-tight">
            They switched.
          </h2>
        </motion.div>
      </div>

      {/* Scroll-driven horizontal track */}
      <div
        ref={containerRef}
        className="relative"
        style={prefersReduced ? {} : { height: "60vh" }}
      >
        <div
          className={`${
            prefersReduced
              ? "px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-6"
              : "sticky top-0 h-screen flex items-center overflow-hidden"
          }`}
        >
          {prefersReduced ? (
            testimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))
          ) : (
            <motion.div
              style={{ x }}
              className="flex gap-6 px-6 sm:px-16 will-change-transform"
            >
              {testimonials.map((t) => (
                <TestimonialCard key={t.name} testimonial={t} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <motion.div
      whileHover={
        typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches
          ? { y: -4 }
          : {}
      }
      transition={{ duration: 0.3 }}
      className="relative flex-shrink-0 w-[min(85vw,420px)] md:w-[420px] rounded-2xl p-8 border border-border/60"
      style={{
        background:
          "linear-gradient(135deg, rgba(17,19,24,0.9) 0%, rgba(17,19,24,0.6) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Quote mark */}
      <div className="absolute top-6 right-6 font-display text-6xl text-accent/10 leading-none select-none">
        &#8220;
      </div>

      <blockquote className="font-display text-xl sm:text-2xl italic font-medium text-text-primary leading-relaxed mb-8">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-surface-2 border border-border flex items-center justify-center">
          <span className="text-accent font-display text-xs font-bold">
            {testimonial.name[0]}
          </span>
        </div>
        <div>
          <p className="text-accent font-body text-sm font-semibold tracking-wider">
            {testimonial.name}
          </p>
          <p className="text-text-secondary font-body text-xs tracking-widest uppercase">
            {testimonial.discipline}
          </p>
        </div>
        {testimonial.verified && (
          <div className="ml-auto flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#00D4FF" strokeWidth="1" />
              <path d="M4.5 7l2 2 3-3" stroke="#00D4FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-accent text-xs font-mono">Verified</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
