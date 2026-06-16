const CONSENT_KEY = "lw_consent";

function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  const val = localStorage.getItem(CONSENT_KEY);
  return val === "all" || val === "necessary";
}

export function track(step: "landing" | "engage" | "intent" | "convert"): void {
  if (!hasConsent()) {
    // Queue for after consent
    if (typeof window !== "undefined") {
      const queue: string[] = JSON.parse(
        sessionStorage.getItem("lw_funnel_queue") || "[]"
      );
      if (!queue.includes(step)) {
        queue.push(step);
        sessionStorage.setItem("lw_funnel_queue", JSON.stringify(queue));
      }
    }
    return;
  }
  _send(step);
}

function _send(step: string): void {
  fetch("/api/funnel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ step, ts: Date.now() }),
    keepalive: true,
  }).catch(() => {});
}

export function flushQueue(): void {
  if (typeof window === "undefined") return;
  const queue: string[] = JSON.parse(
    sessionStorage.getItem("lw_funnel_queue") || "[]"
  );
  queue.forEach(_send);
  sessionStorage.removeItem("lw_funnel_queue");
}
