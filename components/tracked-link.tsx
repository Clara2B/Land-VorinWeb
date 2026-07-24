"use client";

import * as React from "react";

import { pushDataLayerEvent, type TrackingEventName, type TrackingEventPayload } from "@/lib/tracking";

export interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  event?: TrackingEventName;
  eventPayload?: TrackingEventPayload;
}

/**
 * Um <a> normal que dispara um evento no dataLayer antes de navegar.
 * Usado em todo CTA/link de WhatsApp da página para alimentar o GTM.
 */
export const TrackedLink = React.forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  ({ event, eventPayload, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (event) {
        pushDataLayerEvent(event, eventPayload);
      }
      onClick?.(e);
    };

    return <a ref={ref} onClick={handleClick} {...props} />;
  },
);
TrackedLink.displayName = "TrackedLink";
