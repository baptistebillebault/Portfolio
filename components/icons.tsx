const base = {
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5,
  strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
} as const;

export const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} {...base}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

export const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} {...base}><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
);
