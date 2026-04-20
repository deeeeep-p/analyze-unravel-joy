import { ReactNode } from "react";

type Props = {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

export const Chip = ({ active, onClick, children }: Props) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex-shrink-0 rounded-full border-[0.5px] px-3.5 py-1.5 text-[11px] tracking-[0.04em] transition-colors ${
      active
        ? "border-ink bg-ink text-white"
        : "border-hairline bg-card text-ink-light hover:text-ink"
    }`}
  >
    {children}
  </button>
);
