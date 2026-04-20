import { Menu } from "lucide-react";
import { PhoneFrame } from "@/components/salon/PhoneFrame";
import { StatusBar } from "@/components/salon/StatusBar";
import { TopBar, IconButton } from "@/components/salon/TopBar";
import { BottomNav } from "@/components/salon/BottomNav";
import { CartBar } from "@/components/salon/CartBar";
import { invoices } from "@/data/mockData";

const Loyalty = () => {
  return (
    <PhoneFrame>
      <StatusBar />
      <TopBar
        right={
          <IconButton ariaLabel="Menu">
            <Menu className="h-4 w-4" strokeWidth={1.5} />
          </IconButton>
        }
      />

      <div className="flex-1 overflow-y-auto pb-4">
        <div className="px-5 pb-2 pt-4">
          <div className="mb-1 text-[9px] uppercase tracking-[0.12em] text-ink-light">
            Your membership
          </div>
          <h1 className="font-serif text-[28px] font-light leading-[1.1] text-ink">
            Enrich & <em className="italic">Earn</em>
          </h1>
        </div>

        {/* Tier card */}
        <section className="mx-4 rounded-[14px] bg-ink p-5 text-white">
          <div className="mb-1.5 text-[9px] uppercase tracking-[0.12em] text-gold-light">
            Current tier
          </div>
          <div className="mb-1 font-serif text-[26px] font-light text-white">Gold Member</div>
          <div className="mb-3.5 text-[11px] text-white/45">260 points to Platinum status</div>
          <div className="mb-1.5 h-[3px] overflow-hidden rounded-sm bg-white/10">
            <div className="h-full w-[62%] rounded-sm bg-gold" />
          </div>
          <div className="flex justify-between text-[9px] text-white/40">
            <span>Gold</span>
            <span>Platinum</span>
          </div>
          <div className="mt-3.5 flex gap-2">
            {[
              { v: "1,240", l: "Points" },
              { v: "18", l: "Visits" },
              { v: "₹580", l: "Saved" },
            ].map((b) => (
              <div
                key={b.l}
                className="flex-1 rounded-[10px] border-[0.5px] border-white/10 bg-white/5 p-2.5"
              >
                <span className="block font-serif text-xl text-gold-light">{b.v}</span>
                <span className="text-[9px] uppercase tracking-[0.07em] text-white/40">
                  {b.l}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Wallet */}
        <section className="mx-4 mt-3 rounded-[14px] border-[0.5px] border-hairline bg-card px-4 py-3.5">
          <div className="mb-1 text-[10px] uppercase tracking-[0.06em] text-ink-light">
            Enrich Wallet
          </div>
          <div className="mb-3 font-serif text-[28px] font-light text-ink">₹3,450</div>
          <div className="flex gap-2">
            <button className="flex-1 rounded-[10px] border-[0.5px] border-ink bg-ink py-2 text-[11px] text-white">
              Add funds
            </button>
            <button className="flex-1 rounded-[10px] border-[0.5px] border-hairline bg-transparent py-2 text-[11px] text-ink-mid">
              Transfer
            </button>
            <button className="flex-1 rounded-[10px] border-[0.5px] border-hairline bg-transparent py-2 text-[11px] text-ink-mid">
              History
            </button>
          </div>
        </section>

        {/* Recent visits */}
        <div className="flex items-baseline justify-between px-5 pb-2 pt-4">
          <h3 className="font-serif text-[17px] font-normal text-ink">Recent visits</h3>
          <span className="cursor-pointer text-[11px] tracking-[0.04em] text-gold">
            View all →
          </span>
        </div>
        <div className="px-4">
          {invoices.map((inv, i) => (
            <div
              key={inv.id}
              className={`flex items-center justify-between py-3 ${
                i < invoices.length - 1 ? "border-b-[0.5px] border-hairline" : ""
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`h-2 w-2 flex-shrink-0 rounded-full ${
                    inv.primary ? "bg-gold" : "bg-hairline"
                  }`}
                />
                <div>
                  <div className="text-[12px] font-medium text-ink">{inv.name}</div>
                  <div className="text-[10px] text-ink-light">
                    {inv.date} · {inv.stylist}
                  </div>
                </div>
              </div>
              <span className="font-serif text-base text-ink">₹{inv.amount}</span>
            </div>
          ))}
        </div>
        <div className="h-5" />
      </div>

      <CartBar />
      <BottomNav />
    </PhoneFrame>
  );
};

export default Loyalty;
