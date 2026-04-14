export function Reticle() {
  return (
    <svg
      className="reticle"
      viewBox="0 0 1440 900"
      role="img"
      aria-label="Decorative targeting overlay"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="1080" cy="250" r="110" opacity="0.25" />
        <circle cx="1080" cy="250" r="170" opacity="0.08" />
        <path d="M1080 70v70M1080 360v70M900 250h70M1190 250h70" opacity="0.4" />
        <path d="M210 720h260l36-28h214" opacity="0.2" />
        <path d="M140 180h190l42 34h128" opacity="0.18" />
      </g>
    </svg>
  );
}
