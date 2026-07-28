export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ana Jaksic monogram"
    >
      <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="60" cy="60" r="47" stroke="var(--color-gold)" strokeWidth="2" />
      <text
        x="60"
        y="76"
        textAnchor="middle"
        fontFamily="'Playfair Display', serif"
        fontStyle="italic"
        fontWeight="600"
        fontSize="46"
        fill="currentColor"
      >
        AJ
      </text>
      <path
        d="M60 8 L63.5 15.5 L71 18 L63.5 20.5 L60 28 L56.5 20.5 L49 18 L56.5 15.5 Z"
        fill="var(--color-rose)"
      />
    </svg>
  );
}
