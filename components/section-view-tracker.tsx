"use client";

import * as React from "react";

import { pushDataLayerEvent, type TrackingEventName } from "@/lib/tracking";

interface SectionViewTrackerProps {
  event: TrackingEventName;
}

/**
 * Marcador invisível que dispara um evento no dataLayer na primeira vez
 * em que entra na viewport — usado para view_models, view_pricing e
 * view_faq. Não afeta layout nem leitores de tela (aria-hidden).
 */
export function SectionViewTracker({ event }: SectionViewTrackerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const firedRef = React.useRef(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          pushDataLayerEvent(event);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [event]);

  return <div ref={ref} aria-hidden="true" className="h-px w-full" />;
}
