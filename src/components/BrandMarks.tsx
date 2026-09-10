export function BmwMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" />
      <path d="M50 4a46 46 0 0 1 0 92z" fill="currentColor" opacity="0.9" />
      <path d="M50 50 4 50a46 46 0 0 1 46-46z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function MercedesMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" />
      <path d="M50 12v38M50 50 22 76M50 50l28 26" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function AudiMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 50" className={className} fill="none">
      {[18, 44, 70, 96].map((cx) => (
        <circle key={cx} cx={cx} cy="25" r="16" stroke="currentColor" strokeWidth="4" />
      ))}
    </svg>
  );
}

export function PorscheMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 100" className={className} fill="none">
      <path
        d="M45 4 8 18v34c0 26 16 40 37 44 21-4 37-18 37-44V18Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M45 4v92" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

export function LandRoverMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 60" className={className} fill="none">
      <ellipse cx="70" cy="30" rx="64" ry="24" stroke="currentColor" strokeWidth="4" />
      <text x="70" y="37" textAnchor="middle" fontSize="16" fontWeight="700" fill="currentColor" fontFamily="sans-serif">
        LAND
      </text>
    </svg>
  );
}

export function AstonMartinMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 60" className={className} fill="none">
      <path
        d="M4 44 30 12l14 20 14-20 14 20 14-20 14 20 14-20 12 32"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const brandMarks: Record<string, (props: { className?: string }) => React.ReactElement> = {
  BMW: BmwMark,
  "Mercedes-Benz": MercedesMark,
  Audi: AudiMark,
  Porsche: PorscheMark,
  "Land Rover": LandRoverMark,
  "Aston Martin": AstonMartinMark,
};
