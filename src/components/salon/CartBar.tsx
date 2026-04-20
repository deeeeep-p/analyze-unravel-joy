import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { useCart } from "@/hooks/useCart";

/**
 * Sticky cart bar that floats just above the bottom nav whenever
 * at least one service is in the cart. Hidden on the booking flow
 * (the booking page renders its own footer).
 */
export const CartBar = () => {
  const { count, totalPrice, totalDuration } = useCart();
  const { pathname } = useLocation();

  if (count === 0) return null;
  if (pathname.startsWith("/book")) return null;

  return (
    <div className="sticky bottom-[68px] z-20 mx-3 mb-2 rounded-[16px] border-[0.5px] border-ink/20 bg-ink px-3.5 py-2.5 shadow-[0_8px_28px_-12px_hsl(var(--ink)/0.4)]">
      <div className="flex items-center gap-3">
        <div className="flex h-9 min-w-9 items-center justify-center rounded-full bg-gold px-2 text-[12px] font-medium text-white">
          {count}
        </div>
        <div className="flex-1">
          <div className="text-[12px] font-medium text-white">
            {count} ritual{count > 1 ? "s" : ""} · ₹{totalPrice}
          </div>
          <div className="mt-0.5 flex items-center gap-1 text-[10px] text-white/60">
            <Clock className="h-3 w-3" strokeWidth={1.5} />
            {totalDuration} min total
          </div>
        </div>
        <Link
          to="/book"
          className="flex items-center gap-1 rounded-full bg-gold px-4 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-90"
        >
          Book now
          <ArrowRight className="h-3 w-3" strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
};
