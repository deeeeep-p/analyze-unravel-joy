import { Link } from "react-router-dom";
import { CreditCard, Bell, LogOut, User as UserIcon } from "lucide-react";
import { toast } from "sonner";
import { PhoneFrame } from "@/components/salon/PhoneFrame";
import { StatusBar } from "@/components/salon/StatusBar";
import { BottomNav } from "@/components/salon/BottomNav";
import { CartBar } from "@/components/salon/CartBar";

const settings = [
  { icon: UserIcon, label: "Personal information" },
  { icon: CreditCard, label: "Payment methods" },
  { icon: Bell, label: "Preferences & notifications" },
] as const;

const Profile = () => {
  const handleSignOut = () => {
    toast.success("Signed out (demo)");
  };

  return (
    <PhoneFrame topBg="ink">
      <StatusBar tone="dark" />
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Hero */}
        <div className="bg-ink px-5 pb-3.5 pt-5">
          <div className="mb-4 flex items-start gap-3.5">
            <div className="flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-gold bg-ink-mid">
              <UserIcon className="h-[26px] w-[26px] text-white/40" strokeWidth={1.2} />
            </div>
            <div>
              <div className="mb-0.5 font-serif text-[22px] font-light text-white">
                Julianne Reed
              </div>
              <div className="inline-flex items-center gap-1 rounded-full border-[0.5px] border-gold bg-gold/20 px-2.5 py-0.5">
                <span className="text-[10px] tracking-[0.06em] text-gold-light">
                  ✦ Gold Member
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-px border-t-[0.5px] border-white/10 pt-3.5">
            {[
              { v: "18", l: "Visits" },
              { v: "1,240", l: "Points" },
              { v: "₹580", l: "Saved" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <span className="block font-serif text-[22px] font-light text-white">{s.v}</span>
                <span className="text-[9px] uppercase tracking-[0.08em] text-white/40">
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div className="flex items-baseline justify-between px-5 pb-2 pt-4">
          <h3 className="font-serif text-[17px] font-normal text-ink">Upcoming</h3>
          <Link to="/book" className="text-[11px] tracking-[0.04em] text-gold">
            Book new →
          </Link>
        </div>
        <div className="mx-4 overflow-hidden rounded-[14px] border-[0.5px] border-hairline">
          <div className="flex items-center justify-between bg-gold-pale px-3.5 py-2.5">
            <span className="text-[9px] uppercase tracking-[0.1em] text-gold">
              Next appointment
            </span>
            <span className="cursor-pointer text-[10px] text-gold">Manage</span>
          </div>
          <div className="bg-card px-3.5 py-3">
            <div className="mb-1 text-[14px] font-medium text-ink">
              Signature Sculpt & Style
            </div>
            <div className="text-[11px] text-ink-light">
              Elena Vance · Apr 20, 2026 · 11:00 AM · 90 min
            </div>
            <div className="mt-2.5 flex gap-1.5">
              <button className="flex-1 rounded-[10px] border-[0.5px] border-hairline bg-transparent py-1.5 text-[10px] tracking-[0.04em] text-ink-mid">
                Reschedule
              </button>
              <button className="flex-1 rounded-[10px] border-[0.5px] border-hairline bg-transparent py-1.5 text-[10px] tracking-[0.04em] text-ink-mid">
                Cancel
              </button>
              <Link
                to="/book"
                className="flex-1 rounded-[10px] border-[0.5px] border-ink bg-ink py-1.5 text-center text-[10px] tracking-[0.04em] text-white"
              >
                Book again
              </Link>
            </div>
          </div>
        </div>

        {/* Account */}
        <div className="flex items-baseline justify-between px-5 pb-1.5 pt-4">
          <h3 className="font-serif text-[17px] font-normal text-ink">Account</h3>
        </div>
        <div className="px-4">
          {settings.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between border-b-[0.5px] border-hairline py-3.5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cream-dark">
                  <s.icon className="h-[15px] w-[15px] text-ink/50" strokeWidth={1.5} />
                </div>
                <span className="text-[13px] text-ink">{s.label}</span>
              </div>
              <span className="text-sm text-hairline">›</span>
            </div>
          ))}
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center justify-between py-3.5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cream-dark">
                <LogOut className="h-[15px] w-[15px] text-ink/50" strokeWidth={1.5} />
              </div>
              <span className="text-[13px] text-ink-light">Sign out</span>
            </div>
            <span className="text-sm text-hairline">›</span>
          </button>
        </div>
        <div className="h-5" />
      </div>

      <CartBar />
      <BottomNav />
    </PhoneFrame>
  );
};

export default Profile;
