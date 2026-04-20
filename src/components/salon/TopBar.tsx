import { ReactNode } from "react";

type Props = {
  left?: ReactNode;
  right?: ReactNode;
};

export const TopBar = ({ left, right }: Props) => {
  return (
    <div className="flex items-center justify-between px-5 pb-2 pt-3">
      <div className="min-w-9">{left ?? <div className="w-9" />}</div>
      <span className="font-serif text-[22px] font-normal tracking-[0.12em] text-ink">
        HIPSTER
      </span>
      <div className="min-w-9 flex justify-end">{right ?? <div className="w-9" />}</div>
    </div>
  );
};

export const IconButton = ({ children, onClick, ariaLabel }: { children: ReactNode; onClick?: () => void; ariaLabel: string }) => (
  <button
    type="button"
    aria-label={ariaLabel}
    onClick={onClick}
    className="flex h-9 w-9 items-center justify-center rounded-full border-[0.5px] border-hairline bg-card text-ink transition-colors hover:bg-cream-dark"
  >
    {children}
  </button>
);
