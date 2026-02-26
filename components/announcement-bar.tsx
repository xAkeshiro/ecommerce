"use client";

import { useState, useEffect } from "react";

const DISMISSED_KEY = "akira-labs-announcement-dismissed";

export function AnnouncementBar({
  onVisibilityChange,
}: {
  onVisibilityChange?: (visible: boolean) => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(DISMISSED_KEY)) {
        setVisible(true);
        onVisibilityChange?.(true);
      }
    } catch {
      setVisible(true);
      onVisibilityChange?.(true);
    }
  }, [onVisibilityChange]);

  function dismiss() {
    setVisible(false);
    onVisibilityChange?.(false);
    try {
      sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Ignore
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-btn-bg py-2.5 text-center">
      <p className="font-mono text-[9px] uppercase tracking-[3px] text-btn-text">
        Free shipping over $100 &middot; Subscribe &amp; save 15%
      </p>
      <button
        onClick={dismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-btn-text/60 transition-colors hover:text-btn-text"
        aria-label="Dismiss"
      >
        &times;
      </button>
    </div>
  );
}
