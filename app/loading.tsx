export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-6 animate-spin border border-line border-t-ink" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
          Loading
        </span>
      </div>
    </div>
  );
}
