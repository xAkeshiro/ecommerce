import Image from "next/image";

interface ProductVisualProps {
  image: string;
  imageUrl?: string;
  name: string;
  subtitle: string;
}

const BODY = "var(--product-body)";
const CAP = "var(--product-cap)";
const STROKE = "var(--product-stroke)";
const LABEL = "var(--product-label)";
const NAME = "var(--product-name)";
const TYPE = "var(--product-type)";
const ACCENT = "var(--product-stroke)";

function ContainerSVG({
  name,
  productType,
  height = 280,
}: {
  name: string;
  productType: string;
  height?: number;
}) {
  return (
    <svg
      viewBox={`0 0 200 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      {/* Container body */}
      <rect
        x="40"
        y="20"
        width="120"
        height={height - 40}
        rx="4"
        fill={BODY}
        stroke={STROKE}
        strokeWidth="1"
      />
      {/* Cap/lid */}
      <rect
        x="70"
        y="10"
        width="60"
        height="16"
        rx="3"
        fill={CAP}
        stroke={STROKE}
        strokeWidth="1"
      />
      {/* Brand wordmark */}
      <text
        x="100"
        y="70"
        textAnchor="middle"
        fill={LABEL}
        fontSize="6"
        fontFamily="monospace"
        letterSpacing="3"
      >
        AKIRA LABS
      </text>
      {/* Product name */}
      <text
        x="100"
        y="140"
        textAnchor="middle"
        fill={NAME}
        fontSize="16"
        fontFamily="monospace"
        fontWeight="bold"
        letterSpacing="4"
      >
        {name}
      </text>
      {/* Accent line */}
      <line
        x1="70"
        y1="155"
        x2="130"
        y2="155"
        stroke={ACCENT}
        strokeWidth="1"
        opacity="0.6"
      />
      {/* Product type */}
      <text
        x="100"
        y="175"
        textAnchor="middle"
        fill={TYPE}
        fontSize="7"
        fontFamily="monospace"
        letterSpacing="2"
      >
        {productType}
      </text>
    </svg>
  );
}

function StickPackSVG({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      {/* Box */}
      <rect
        x="35"
        y="30"
        width="130"
        height="200"
        rx="3"
        fill={BODY}
        stroke={STROKE}
        strokeWidth="1"
      />
      {/* Flap line */}
      <line
        x1="35"
        y1="55"
        x2="165"
        y2="55"
        stroke={STROKE}
        strokeWidth="1"
      />
      {/* Brand */}
      <text
        x="100"
        y="85"
        textAnchor="middle"
        fill={LABEL}
        fontSize="6"
        fontFamily="monospace"
        letterSpacing="3"
      >
        AKIRA LABS
      </text>
      {/* Name */}
      <text
        x="100"
        y="140"
        textAnchor="middle"
        fill={NAME}
        fontSize="16"
        fontFamily="monospace"
        fontWeight="bold"
        letterSpacing="4"
      >
        {name}
      </text>
      {/* Accent */}
      <line
        x1="70"
        y1="155"
        x2="130"
        y2="155"
        stroke={ACCENT}
        strokeWidth="1"
        opacity="0.6"
      />
      {/* Type */}
      <text
        x="100"
        y="175"
        textAnchor="middle"
        fill={TYPE}
        fontSize="7"
        fontFamily="monospace"
        letterSpacing="2"
      >
        ELECTROLYTE STICKS
      </text>
      {/* Stick packets peeking out */}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={62 + i * 25}
          y="215"
          width="16"
          height="40"
          rx="2"
          fill={CAP}
          stroke={STROKE}
          strokeWidth="0.5"
        />
      ))}
    </svg>
  );
}

function CapsuleBottleSVG({
  name,
  productType,
}: {
  name: string;
  productType: string;
}) {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      {/* Bottle body */}
      <rect
        x="55"
        y="40"
        width="90"
        height="210"
        rx="6"
        fill={BODY}
        stroke={STROKE}
        strokeWidth="1"
      />
      {/* Cap */}
      <rect
        x="70"
        y="20"
        width="60"
        height="26"
        rx="4"
        fill={CAP}
        stroke={STROKE}
        strokeWidth="1"
      />
      {/* Brand */}
      <text
        x="100"
        y="85"
        textAnchor="middle"
        fill={LABEL}
        fontSize="6"
        fontFamily="monospace"
        letterSpacing="3"
      >
        AKIRA LABS
      </text>
      {/* Name */}
      <text
        x="100"
        y="145"
        textAnchor="middle"
        fill={NAME}
        fontSize="14"
        fontFamily="monospace"
        fontWeight="bold"
        letterSpacing="3"
      >
        {name}
      </text>
      {/* Accent */}
      <line
        x1="75"
        y1="160"
        x2="125"
        y2="160"
        stroke={ACCENT}
        strokeWidth="1"
        opacity="0.6"
      />
      {/* Type */}
      <text
        x="100"
        y="180"
        textAnchor="middle"
        fill={TYPE}
        fontSize="6"
        fontFamily="monospace"
        letterSpacing="2"
      >
        {productType}
      </text>
    </svg>
  );
}

function TubSVG({
  name,
  productType,
}: {
  name: string;
  productType: string;
}) {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      {/* Wide tub body */}
      <rect
        x="30"
        y="50"
        width="140"
        height="200"
        rx="6"
        fill={BODY}
        stroke={STROKE}
        strokeWidth="1"
      />
      {/* Lid */}
      <rect
        x="30"
        y="35"
        width="140"
        height="22"
        rx="4"
        fill={CAP}
        stroke={STROKE}
        strokeWidth="1"
      />
      {/* Brand */}
      <text
        x="100"
        y="90"
        textAnchor="middle"
        fill={LABEL}
        fontSize="6"
        fontFamily="monospace"
        letterSpacing="3"
      >
        AKIRA LABS
      </text>
      {/* Name */}
      <text
        x="100"
        y="150"
        textAnchor="middle"
        fill={NAME}
        fontSize="18"
        fontFamily="monospace"
        fontWeight="bold"
        letterSpacing="4"
      >
        {name}
      </text>
      {/* Accent */}
      <line
        x1="65"
        y1="168"
        x2="135"
        y2="168"
        stroke={ACCENT}
        strokeWidth="1"
        opacity="0.6"
      />
      {/* Type */}
      <text
        x="100"
        y="190"
        textAnchor="middle"
        fill={TYPE}
        fontSize="7"
        fontFamily="monospace"
        letterSpacing="2"
      >
        {productType}
      </text>
    </svg>
  );
}

const VISUAL_MAP: Record<
  string,
  (name: string) => React.ReactElement
> = {
  "pre-workout": (name) => (
    <ContainerSVG name={name} productType="PRE-WORKOUT" />
  ),
  whey: (name) => <TubSVG name={name} productType="WHEY ISOLATE" />,
  electrolyte: (name) => <StickPackSVG name={name} />,
  creatine: (name) => (
    <ContainerSVG name={name} productType="CREATINE MONO" />
  ),
  greens: (name) => <ContainerSVG name={name} productType="DAILY GREENS" />,
  bcaa: (name) => (
    <ContainerSVG name={name} productType="RECOVERY BCAA" />
  ),
  nootropic: (name) => (
    <CapsuleBottleSVG name={name} productType="NOOTROPIC · 60 CAPS" />
  ),
  multi: (name) => (
    <CapsuleBottleSVG name={name} productType="DAILY MULTI · 60 CAPS" />
  ),
};

export function ProductVisual({
  image,
  imageUrl,
  name,
}: ProductVisualProps) {
  if (imageUrl) {
    return (
      <div className="relative h-full w-full bg-card">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
    );
  }

  const renderer = VISUAL_MAP[image];
  if (!renderer) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-card font-mono text-xs text-ink-muted">
        {name}
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-card p-4">
      {renderer(name)}
    </div>
  );
}
