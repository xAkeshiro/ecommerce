"use client";

import { useState } from "react";

export function NewsletterForm({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <div className={className}>
      <p className="font-mono text-[10px] uppercase tracking-[3px] text-ink">
        Join the Protocol
      </p>
      <p className="mt-2 text-xs leading-relaxed text-ink-3">
        New formulas, restocks, and insights — delivered directly.
      </p>
      {submitted ? (
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[2px] text-ink-2">
          You&apos;re in. Welcome to the protocol.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 border border-line bg-transparent px-4 py-2.5 font-mono text-xs text-ink outline-none placeholder:text-ink-faint transition-colors focus:border-line-hover"
          />
          <button
            type="submit"
            className="border border-l-0 border-line bg-btn-bg px-4 py-2.5 font-mono text-xs text-btn-text transition-colors hover:bg-btn-hover"
          >
            &rarr;
          </button>
        </form>
      )}
    </div>
  );
}
