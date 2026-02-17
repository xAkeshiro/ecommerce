export function ProtocolBundle() {
  return (
    <div className="border-y border-line py-10">
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-[60px]">
          {/* SIGNAL */}
          <div className="text-center">
            <p className="font-mono text-[11px] tracking-[2px] text-ink-2">SIGNAL</p>
            <p className="font-mono text-[9px] text-ink-muted">Pre-Workout</p>
          </div>
          <span className="font-mono text-[14px] text-ink-faint">+</span>
          {/* COMPOUND */}
          <div className="text-center">
            <p className="font-mono text-[11px] tracking-[2px] text-ink-2">COMPOUND</p>
            <p className="font-mono text-[9px] text-ink-muted">Whey Isolate</p>
          </div>
          <span className="font-mono text-[14px] text-ink-faint">+</span>
          {/* ELEMENT */}
          <div className="text-center">
            <p className="font-mono text-[11px] tracking-[2px] text-ink-2">ELEMENT</p>
            <p className="font-mono text-[9px] text-ink-muted">Electrolytes</p>
          </div>
          <span className="font-mono text-[14px] text-ink-faint">=</span>
          {/* Price */}
          <div className="text-center">
            <p className="font-mono text-[16px] text-ink">$120</p>
            <p className="font-mono text-[9px] text-ink-muted">Save $18</p>
          </div>
        </div>
      </div>
    </div>
  );
}
