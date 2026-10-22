import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigationType } from "react-router";

import { applyHead, getRouteHead } from "@/lib/seo";

export default function RouteEffects() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const [announcement, setAnnouncement] = useState("");

  const scrollPositions = useRef(new Map<string, number>());
  const previous = useRef(location);
  const currentKey = useRef(location.key);

  useEffect(() => {
    const record = () => {
      scrollPositions.current.set(currentKey.current, window.scrollY);
    };

    window.addEventListener("scroll", record, { passive: true });

    return () => window.removeEventListener("scroll", record);
  }, []);

  useLayoutEffect(() => {
    const from = previous.current;

    previous.current = location;
    currentKey.current = location.key;

    if (from === location) {
      if (!document.head.querySelector("[data-route-head]")) {
        applyHead(getRouteHead(location.pathname).tags);
      }

      return;
    }

    if (from.pathname === location.pathname) return;

    applyHead(getRouteHead(location.pathname).tags);
    setAnnouncement(document.title);

    const saved =
      navigationType === "POP"
        ? scrollPositions.current.get(location.key)
        : undefined;

    if (saved !== undefined) {
      window.scrollTo({ top: saved, behavior: "instant" });
      return;
    }

    const target = location.hash
      ? document.getElementById(decodeURIComponent(location.hash.slice(1)))
      : null;

    if (target) {
      target.scrollIntoView({ behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location, navigationType]);

  return (
    <div className="sr-only" aria-live="assertive" role="alert">
      {announcement}
    </div>
  );
}