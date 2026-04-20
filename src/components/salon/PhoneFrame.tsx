import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  topBg?: "cream" | "ink";
};

/**
 * Mobile-first 390px phone column. On desktop, centered on cream backdrop.
 */
export const PhoneFrame = ({ children, topBg = "cream" }: Props) => {
  return (
    <div className="min-h-screen w-full bg-cream-dark">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col bg-cream shadow-[0_0_60px_-30px_hsl(var(--ink)/0.3)]">
        <div className="screen-fade flex min-h-screen flex-1 flex-col" data-top={topBg}>
          {children}
        </div>
      </div>
    </div>
  );
};
