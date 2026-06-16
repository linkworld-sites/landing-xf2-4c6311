"use client";

import { useEffect } from "react";
import { track } from "@/lib/funnel";

export default function FunnelTracker() {
  useEffect(() => {
    track("landing");

    const onEngage = () => {
      track("engage");
    };

    window.addEventListener("scroll", onEngage, { once: true, passive: true });
    window.addEventListener("click", onEngage, { once: true });

    return () => {
      window.removeEventListener("scroll", onEngage);
      window.removeEventListener("click", onEngage);
    };
  }, []);

  return null;
}
