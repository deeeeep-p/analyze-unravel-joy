import { NavLink, useLocation } from "react-router-dom";
import { Calendar, Home, Scissors, Star, User } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/services", label: "Services", icon: Scissors },
  { to: "/book", label: "Book", icon: Calendar, fab: true },
  { to: "/loyalty", label: "Loyalty", icon: Star },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export const BottomNav = () => {
  const { pathname } = useLocation();
  return (
    <nav className="sticky bottom-0 z-10 flex items-center justify-around border-t-[0.5px] border-hairline bg-card px-2 pb-3.5 pt-2.5">
      {items.map(({ to, label, icon: Icon, fab }) => {
        const active = pathname === to;
        if (fab) {
          return (
            <NavLink
              key={to}
              to={to}
              className="relative flex flex-col items-center gap-1"
              aria-label={label}
            >
              <div className="-mt-[18px] flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-cream bg-ink">
                <Icon className="h-[18px] w-[18px] text-white" strokeWidth={1.5} />
              </div>
              <span
                className={`text-[9px] uppercase tracking-[0.06em] ${
                  active ? "text-ink" : "text-ink-light"
                }`}
              >
                {label}
              </span>
            </NavLink>
          );
        }
        return (
          <NavLink
            key={to}
            to={to}
            className="flex flex-col items-center gap-1 px-2"
            aria-label={label}
          >
            <Icon
              className={`h-5 w-5 ${active ? "text-ink" : "text-ink-light"}`}
              strokeWidth={1.5}
            />
            <span
              className={`text-[9px] uppercase tracking-[0.06em] ${
                active ? "text-ink" : "text-ink-light"
              }`}
            >
              {label}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
};
