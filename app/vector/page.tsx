"use client";

import { useRef } from "react";

function LogoSVG({
  color,
  bg,
  id,
}: {
  color: string;
  bg: string | null;
  id: string;
}) {
  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 80"
      className="w-full"
    >
      {bg && <rect width="400" height="80" fill={bg} />}
      {/* Symbol — bordered square with inner filled square */}
      <rect
        x="20"
        y="20"
        width="40"
        height="40"
        rx="0"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect x="33" y="33" width="14" height="14" fill={color} />
      {/* Wordmark */}
      <text
        x="80"
        y="48"
        fill={color}
        fontFamily="'Space Mono', monospace"
        fontSize="16"
        letterSpacing="6"
        fontWeight="400"
      >
        AKIRA LABS
      </text>
    </svg>
  );
}

function SymbolOnlySVG({
  color,
  bg,
  id,
}: {
  color: string;
  bg: string | null;
  id: string;
}) {
  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      className="w-full"
    >
      {bg && <rect width="80" height="80" fill={bg} />}
      <rect
        x="15"
        y="15"
        width="50"
        height="50"
        rx="0"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
      <rect x="31" y="31" width="18" height="18" fill={color} />
    </svg>
  );
}

function downloadSVG(elementId: string, filename: string) {
  const svg = document.getElementById(elementId);
  if (!svg) return;
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svg);
  if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

interface VariantCardProps {
  label: string;
  description: string;
  svgId: string;
  filename: string;
  bgClass: string;
  children: React.ReactNode;
}

function VariantCard({
  label,
  description,
  svgId,
  filename,
  bgClass,
  children,
}: VariantCardProps) {
  return (
    <div className="space-y-4">
      <div
        className={`flex items-center justify-center border border-line p-10 ${bgClass}`}
      >
        <div className="w-full max-w-xs">{children}</div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-ink">
            {label}
          </p>
          <p className="mt-0.5 text-[11px] text-ink-muted">{description}</p>
        </div>
        <button
          onClick={() => downloadSVG(svgId, filename)}
          className="btn-outline text-[9px] px-4 py-2"
        >
          Download SVG
        </button>
      </div>
    </div>
  );
}

export default function VectorPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="animate-fade-up">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
          Brand Assets
        </p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-ink">
          Logo &amp; Vector
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-3">
          Official AKIRA LABS logo vectors. Available in black, white, and
          transparent variants. All files are SVG format for infinite
          scalability.
        </p>
      </div>

      {/* Full Logo (Symbol + Wordmark) */}
      <div className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
          Full Logo — Symbol + Wordmark
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Black on White */}
          <VariantCard
            label="Black"
            description="For light backgrounds"
            svgId="logo-full-black"
            filename="akira-labs-logo-black.svg"
            bgClass="bg-white"
          >
            <LogoSVG color="#060606" bg="#ffffff" id="logo-full-black" />
          </VariantCard>

          {/* White on Black */}
          <VariantCard
            label="White"
            description="For dark backgrounds"
            svgId="logo-full-white"
            filename="akira-labs-logo-white.svg"
            bgClass="bg-[#060606]"
          >
            <LogoSVG color="#e8e8e8" bg="#060606" id="logo-full-white" />
          </VariantCard>

          {/* Transparent */}
          <VariantCard
            label="Transparent"
            description="No background"
            svgId="logo-full-transparent"
            filename="akira-labs-logo-transparent.svg"
            bgClass="bg-[repeating-conic-gradient(#222_0%_25%,#1a1a1a_0%_50%)] bg-[length:16px_16px]"
          >
            <LogoSVG color="#e8e8e8" bg={null} id="logo-full-transparent" />
          </VariantCard>
        </div>
      </div>

      {/* Symbol Only */}
      <div className="mt-20">
        <h2 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
          Symbol — Icon Only
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Black on White */}
          <VariantCard
            label="Black"
            description="For light backgrounds"
            svgId="symbol-black"
            filename="akira-labs-symbol-black.svg"
            bgClass="bg-white"
          >
            <div className="mx-auto w-24">
              <SymbolOnlySVG color="#060606" bg="#ffffff" id="symbol-black" />
            </div>
          </VariantCard>

          {/* White on Black */}
          <VariantCard
            label="White"
            description="For dark backgrounds"
            svgId="symbol-white"
            filename="akira-labs-symbol-white.svg"
            bgClass="bg-[#060606]"
          >
            <div className="mx-auto w-24">
              <SymbolOnlySVG color="#e8e8e8" bg="#060606" id="symbol-white" />
            </div>
          </VariantCard>

          {/* Transparent */}
          <VariantCard
            label="Transparent"
            description="No background"
            svgId="symbol-transparent"
            filename="akira-labs-symbol-transparent.svg"
            bgClass="bg-[repeating-conic-gradient(#222_0%_25%,#1a1a1a_0%_50%)] bg-[length:16px_16px]"
          >
            <div className="mx-auto w-24">
              <SymbolOnlySVG
                color="#e8e8e8"
                bg={null}
                id="symbol-transparent"
              />
            </div>
          </VariantCard>
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="mt-20 border-t border-line pt-12">
        <h2 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
          Usage Guidelines
        </h2>
        <div className="mt-6 space-y-0 border-t border-line">
          {[
            {
              rule: "Clear Space",
              detail:
                "Maintain minimum clear space equal to the height of the symbol on all sides.",
            },
            {
              rule: "Minimum Size",
              detail:
                "Full logo: 120px wide minimum. Symbol only: 24px minimum.",
            },
            {
              rule: "Color",
              detail:
                "Use black on light backgrounds, white on dark. Never alter the logo colors.",
            },
            {
              rule: "Distortion",
              detail:
                "Do not stretch, rotate, skew, or add effects to the logo.",
            },
          ].map((item) => (
            <div key={item.rule} className="detail-spec">
              <span className="font-mono text-xs text-ink">{item.rule}</span>
              <span className="text-ink-3">{item.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
