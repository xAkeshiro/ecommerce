"use client";

import { useState, useEffect } from "react";

export function SplashScreen() {
  const [phase, setPhase] = useState<"logo" | "text" | "exit" | "done">("logo");

  useEffect(() => {
    // Phase 1: Show logo icon centered (0 - 0.5s)
    const t1 = setTimeout(() => setPhase("text"), 500);
    // Phase 2: Text slides out from icon (0.5s - 1.2s)
    const t2 = setTimeout(() => setPhase("exit"), 1200);
    // Phase 3: Fade out entire splash (1.2s - 1.5s)
    const t3 = setTimeout(() => setPhase("done"), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-page transition-opacity duration-300 ${
        phase === "exit" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Logo icon */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink-faint transition-transform duration-500"
          style={{
            transform: phase === "logo" ? "translateX(0)" : "translateX(0)",
          }}
        >
          <div className="h-3 w-3 bg-ink" />
        </div>

        {/* Text — slides and fades in from behind the icon */}
        <div className="overflow-hidden">
          <span
            className="block font-mono text-sm tracking-[6px] text-ink uppercase whitespace-nowrap transition-all duration-500 ease-out"
            style={{
              transform:
                phase === "logo" ? "translateX(-100%)" : "translateX(0)",
              opacity: phase === "logo" ? 0 : 1,
            }}
          >
            Akira Labs
          </span>
        </div>
      </div>
    </div>
  );
}
