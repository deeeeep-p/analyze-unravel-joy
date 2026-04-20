import type { IconKey } from "@/data/mockData";

type Props = { name: IconKey; className?: string };

export const ServiceIcon = ({ name, className = "h-8 w-8 opacity-30" }: Props) => {
  const stroke = "hsl(var(--gold))";
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1,
    className,
  } as const;

  switch (name) {
    case "scissors":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
      );
    case "balayage":
      return (
        <svg {...common}>
          <path d="M3 3h18v4H3zM3 10h18M3 15h18M3 20h18" />
        </svg>
      );
    case "facial":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9h.01M15 9h.01M9.5 14s1 1.5 2.5 1.5 2.5-1.5 2.5-1.5" />
        </svg>
      );
    case "wrap":
      return (
        <svg {...common}>
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      );
    case "press":
      return (
        <svg {...common}>
          <path d="M12 2C6 2 4 8 4 12s2 8 8 8 8-4 8-8-2-10-8-10z" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        </svg>
      );
    case "spa":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
  }
};
