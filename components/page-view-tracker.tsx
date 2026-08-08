"use client";

import * as React from "react";

import { pushDataLayerEvent } from "@/lib/tracking";

interface PageViewTrackerProps {
  pagePath: string;
}

/** Dispara view_site_rapido uma vez, ao montar a página. */
export function PageViewTracker({ pagePath }: PageViewTrackerProps) {
  React.useEffect(() => {
    pushDataLayerEvent("view_site_rapido", { page_path: pagePath });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
