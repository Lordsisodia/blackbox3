"use client";

import { useEffect } from "react";

export default function WebVitals() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { onCLS, onFID, onLCP, onTTFB, onINP } = await import("web-vitals");
      const endpoint = process.env.NEXT_PUBLIC_VITALS_ENDPOINT || "/api/vitals";
      const log = (metric: any) => {
        if (cancelled) return;
        // eslint-disable-next-line no-console
        console.log("[WebVitals]", metric.name, Math.round(metric.value), metric);
        if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
          try {
            const blob = new Blob([JSON.stringify(metric)], { type: 'application/json' });
            (navigator as any).sendBeacon(endpoint, blob);
          } catch {}
        }
      };
      onCLS(log);
      onFID(log);
      onLCP(log);
      onTTFB(log);
      (onINP as any)?.(log);
    })();
    return () => { cancelled = true; };
  }, []);
  return null;
}
