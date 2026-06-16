"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { flushQueue } from "@/lib/funnel";

const CONSENT_KEY = "lw_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = (type: "all" | "necessary") => {
    localStorage.setItem(CONSENT_KEY, type);
    setVisible(false);
    flushQueue();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md"
        >
          <div className="bg-surface border border-border rounded-xl p-5 shadow-2xl">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Diese Website verwendet Cookies. Weitere Informationen findest du
              in unserer{" "}
              <Link href="/legal/datenschutz" className="text-accent underline">
                Datenschutzerklärung
              </Link>{" "}
              und{" "}
              <Link href="/legal/cookies" className="text-accent underline">
                Cookie-Richtlinie
              </Link>
              .
            </p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => accept("necessary")}
                className="flex-1 py-2 px-3 text-xs font-body text-text-secondary border border-border rounded-lg hover:border-accent/40 transition-colors"
              >
                Nur notwendige
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => accept("all")}
                className="flex-1 py-2 px-3 text-xs font-body font-semibold text-canvas bg-accent rounded-lg hover:bg-accent/90 transition-colors"
              >
                Alle akzeptieren
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
