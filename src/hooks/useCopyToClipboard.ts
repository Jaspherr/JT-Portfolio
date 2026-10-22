import { useEffect, useRef, useState } from "react";

function copyWithTextarea(text: string) {
  const textarea = document.createElement("textarea");

  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.setAttribute("aria-hidden", "true");
  textarea.tabIndex = -1;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}

export function useCopyToClipboard(resetMs = 1800) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const showCopied = () => {
    setCopied(true);

    if (timerRef.current !== null) window.clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      setCopied(false);
      timerRef.current = null;
    }, resetMs);
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showCopied();
    } catch {
      try {
        copyWithTextarea(text);
        showCopied();
      } catch {
        setCopied(false);
      }
    }
  };

  return { copied, copy };
}