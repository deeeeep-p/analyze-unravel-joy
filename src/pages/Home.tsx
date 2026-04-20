import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Menu, ArrowRight } from "lucide-react";
import { PhoneFrame } from "@/components/salon/PhoneFrame";
import { StatusBar } from "@/components/salon/StatusBar";
import { TopBar, IconButton } from "@/components/salon/TopBar";
import { BottomNav } from "@/components/salon/BottomNav";
import { CartBar } from "@/components/salon/CartBar";
import { Chip } from "@/components/salon/Chip";
import { ServiceIcon } from "@/components/salon/ServiceIcon";
import { services, trendingServices } from "@/data/mockData";

const categories = ["All", "Hair", "Skin", "Spa", "Nails"] as const;
type Category = (typeof categories)[number];

const Home = () => {
  const [active, setActive] = useState<Category>("All");

  const pool = [...trendingServices, ...services].filter(
    (s, i, arr) => arr.findIndex((x) => x.id === s.id) === i,
  );
  const filtered = active === "All" ? trendingServices : pool.filter((s) => s.category === active);

  return (
    <PhoneFrame>
      <StatusBar />
      <TopBar
        left={
          <IconButton ariaLabel="Menu">
            <Menu className="h-4 w-4" strokeWidth={1.5} />
          </IconButton>
        }
        right={
          <IconButton ariaLabel="Notifications">
            <Bell className="h-4 w-4" strokeWidth={1.5} />
          </IconButton>
        }
      />

      <div className="flex-1 overflow-y-auto pb-4">
        {/* Greeting */}
        <div className="px-5 pb-2.5 pt-1">
          <p className="mb-0.5 text-[11px] tracking-[0.04em] text-ink-light">Good morning,</p>
          <h1 className="font-serif text-[22px] font-light text-ink">
            Julianne <span className="italic text-gold">✦</span>
          </h1>
        </div>

        {/* Hero card */}
        <section className="relative mx-4 mt-2 overflow-hidden rounded-2xl bg-ink p-5">
          <div className="absolute -bottom-5 right-[60px] h-20 w-20 rounded-full border-[0.5px] border-gold/20" />
          <div className="absolute -bottom-7 right-[50px] h-[100px] w-[100px] rounded-full border-[0.5px] border-gold/10" />
          <div className="absolute right-4 top-4 rounded-[10px] bg-gold-pale px-2.5 py-1.5 text-center">
            <span className="block font-serif text-xl font-normal leading-none text-gold">₹400</span>
            <span className="block text-[8px] tracking-[0.06em] text-gold">gift</span>
          </div>
          <div className="mb-2 text-[9px] uppercase tracking-[0.14em] text-gold-light">
            Weekday offer
          </div>
          <h2 className="mb-1 font-serif text-[26px] font-light leading-tight text-white">
            A little <em className="italic text-gold-light">thank you,</em>
            <br />
            just for you
          </h2>
          <p className="mb-4 text-[11px] leading-[1.5] text-white/60">
            Spend ₹1,200 or more Mon–Fri
            <br />
            and enjoy extra love on your visit.
          </p>
          <div className="flex items-center gap-2">
            <Link
              to="/book"
              className="rounded-full bg-gold px-4 py-2 text-[11px] font-medium tracking-[0.06em] text-white transition-opacity hover:opacity-90"
            >
              Book now
            </Link>
            <button className="rounded-full border-[0.5px] border-white/30 px-4 py-2 text-[11px] tracking-[0.06em] text-white/70 transition-colors hover:text-white">
              Learn more
            </button>
          </div>
        </section>

        {/* Chips */}
        <div className="mt-4 flex gap-1.5 overflow-x-auto px-4 pb-1 scrollbar-none">
          {categories.map((c) => (
            <Chip key={c} active={active === c} onClick={() => setActive(c)}>
              {c}
            </Chip>
          ))}
        </div>

        {/* Trending now */}
        <div className="flex items-baseline justify-between px-5 pb-2.5 pt-5">
          <h3 className="font-serif text-xl font-normal text-ink">
            {active === "All" ? "Trending now" : `${active} rituals`}
          </h3>
          <Link to="/services" className="text-[11px] tracking-[0.04em] text-gold">
            See all →
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="mx-4 rounded-[14px] border-[0.5px] border-dashed border-hairline bg-card px-4 py-8 text-center">
            <div className="mb-1 font-serif text-[15px] text-ink">Coming soon</div>
            <p className="text-[11px] text-ink-light">
              New {active.toLowerCase()} rituals are being curated.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 px-4">
            {filtered.map((s) => (
              <Link
                key={s.id}
                to={`/services/${s.id}`}
                className="overflow-hidden rounded-[14px] border-[0.5px] border-hairline bg-card transition-transform active:scale-[0.98]"
              >
                <div
                  className="flex h-20 items-center justify-center"
                  style={{ backgroundColor: s.thumbBg }}
                >
                  <ServiceIcon name={s.icon} className="h-8 w-8 opacity-30" />
                </div>
                <div className="px-2.5 pb-3 pt-2.5">
                  <div className="mb-0.5 text-[12px] font-medium leading-tight text-ink">
                    {s.name}
                  </div>
                  <div className="mb-2 text-[10px] leading-tight text-ink-light">{s.desc}</div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base text-gold">₹{s.price}</span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-ink">
                      <ArrowRight className="h-3 w-3 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="mx-5 my-4 h-px bg-hairline" />

        {/* Membership strip */}
        <section className="mx-4 flex items-center justify-between rounded-[14px] border-[0.5px] border-gold-light bg-gold-pale px-4 py-3.5">
          <div>
            <div className="mb-0.5 text-[9px] uppercase tracking-[0.1em] text-gold">
              Elevated membership
            </div>
            <div className="font-serif text-[17px] font-normal text-ink">Now Open</div>
            <div className="mt-0.5 text-[10px] text-ink-light">
              Priority booking · exclusive rewards
            </div>
          </div>
          <Link
            to="/loyalty"
            className="flex-shrink-0 rounded-full bg-gold px-4 py-2 text-[11px] font-medium tracking-[0.06em] text-white"
          >
            Join
          </Link>
        </section>

        <div className="h-5" />
      </div>

      <BottomNav />
    </PhoneFrame>
  );
};

export default Home;
