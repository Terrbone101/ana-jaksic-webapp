export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ana Jaksic monogram"
    >
      <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="1.25" />
      <line x1="34" y1="46" x2="86" y2="46" stroke="var(--color-gold)" strokeWidth="1" />
      <line x1="34" y1="74" x2="86" y2="74" stroke="var(--color-gold)" strokeWidth="1" />
      <text
        x="60"
        y="72"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontWeight="600"
        fontSize="40"
        letterSpacing="2"
        fill="currentColor"
      >
        AJ
      </text>
    </svg>
  );
}
