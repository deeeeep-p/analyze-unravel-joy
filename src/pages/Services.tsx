import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { PhoneFrame } from "@/components/salon/PhoneFrame";
import { StatusBar } from "@/components/salon/StatusBar";
import { TopBar, IconButton } from "@/components/salon/TopBar";
import { BottomNav } from "@/components/salon/BottomNav";
import { Chip } from "@/components/salon/Chip";
import { ServiceIcon } from "@/components/salon/ServiceIcon";
import { services } from "@/data/mockData";

const categories = ["Hair Artistry", "Skin", "Spa", "Mani-Pedi"] as const;

const categoryFilter = (label: (typeof categories)[number]) =>
  label === "Hair Artistry" ? "Hair" : label === "Mani-Pedi" ? "Nails" : label;

const Services = () => {
  const [active, setActive] = useState<(typeof categories)[number]>("Hair Artistry");
  const filter = categoryFilter(active);
  const filtered = services.filter((s) => s.category === filter);
  const list = filtered.length ? filtered : services;

  return (
    <PhoneFrame>
      <StatusBar />
      <TopBar
        right={
          <IconButton ariaLabel="Search">
            <Search className="h-4 w-4" strokeWidth={1.5} />
          </IconButton>
        }
      />
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="px-5 pb-2 pt-4">
          <div className="mb-1 text-[9px] uppercase tracking-[0.12em] text-ink-light">
            Curated rituals
          </div>
          <h1 className="font-serif text-[28px] font-light leading-[1.1] text-ink">
            The Art of <em className="italic">Renewal</em>
          </h1>
          <p className="mt-1 text-[12px] leading-[1.5] text-ink-light">
            Sensory experiences designed to restore balance.
          </p>
        </div>

        <div className="flex gap-1.5 overflow-x-auto px-4 pb-1 scrollbar-none">
          {categories.map((c) => (
            <Chip key={c} active={active === c} onClick={() => setActive(c)}>
              {c}
            </Chip>
          ))}
        </div>

        <div className="mt-2 flex flex-col px-4">
          {list.map((s, i) => (
            <Link
              key={s.id}
              to="/book"
              className={`flex items-center gap-3 py-3 ${
                i < list.length - 1 ? "border-b-[0.5px] border-hairline" : ""
              }`}
            >
              <div
                className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-[10px]"
                style={{ backgroundColor: s.thumbBg }}
              >
                <ServiceIcon name={s.icon} className="h-[22px] w-[22px] opacity-30" />
              </div>
              <div className="flex-1">
                <div className="mb-0.5 text-[13px] font-medium text-ink">{s.name}</div>
                <div className="text-[11px] leading-tight text-ink-light">{s.desc}</div>
              </div>
              <span className="font-serif text-[18px] font-normal text-gold">₹{s.price}</span>
            </Link>
          ))}
        </div>

        <div className="h-5" />
      </div>
      <BottomNav />
    </PhoneFrame>
  );
};

export default Services;
