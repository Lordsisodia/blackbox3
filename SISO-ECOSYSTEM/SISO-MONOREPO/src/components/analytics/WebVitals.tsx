"use client";

import { useEffect } from "react";

export default function WebVitals() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { onCLS, onFID, onLCP, onTTFB, onINP } = await import("web-vitals");
      const log = (metric: any) => {
        if (cancelled) return;
        // Lightweight dev logging; replace with endpoint if needed
        // eslint-disable-next-line no-console
        console.log("[WebVitals]", metric.name, Math.round(metric.value), metric);
      };
      onCLS(log);
      onFID(log);
      onLCP(log);
      onTTFB(log);
      onINP?.(log as any);
    })();
    return () => { cancelled = true; };
  }, []);
  return null;
}

