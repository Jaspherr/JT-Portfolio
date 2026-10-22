import { useLayoutEffect } from "react";

import { prefersReducedMotion } from "@/lib/motion";
import { playOnScroll, type TimelineSpec } from "@/lib/scroll-timeline";

export function useScrollTimelines(timelines: TimelineSpec[]) {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    return playOnScroll(timelines);
  }, [timelines]);
}