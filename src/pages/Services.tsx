import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Check, Clock, Plus } from "lucide-react";
import { toast } from "sonner";
import { PhoneFrame } from "@/components/salon/PhoneFrame";
import { StatusBar } from "@/components/salon/StatusBar";
import { TopBar, IconButton } from "@/components/salon/TopBar";
import { BottomNav } from "@/components/salon/BottomNav";
import { CartBar } from "@/components/salon/CartBar";
import { Chip } from "@/components/salon/Chip";
import { ServiceIcon } from "@/components/salon/ServiceIcon";
import { services, trendingServices, type Service } from "@/data/mockData";
import { useCart } from "@/hooks/useCart";

const categories = ["All", "Hair Artistry", "Skin", "Spa", "Mani-Pedi"] as const;

const categoryFilter = (label: (typeof categories)[number]) =>
  label === "Hair Artistry" ? "Hair" : label === "Mani-Pedi" ? "Nails" : label;

const Services = () => {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const navigate = useNavigate();
  const { add, has } = useCart();

  // Merge curated + trending, dedupe
  const pool = [...services, ...trendingServices].filter(
    (s, i, arr) => arr.findIndex((x) => x.id === s.id) === i,
  );
  const list =
    active === "All" ? pool : pool.filter((s) => s.category === categoryFilter(active));

  const handleAdd = (s: Service) => {
    if (has(s.id)) {
      toast.message("Already in your cart", { description: s.name });
      return;
    }
    add(s);
    toast.success("Added to cart", { description: s.name });
  };

  const handleBookNow = (s: Service) => {
    if (!has(s.id)) add(s);
    navigate("/book");
  };

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
            Add multiple to book in one seamless flow.
          </p>
        </div>

        <div className="flex gap-1.5 overflow-x-auto px-4 pb-1 scrollbar-none">
          {categories.map((c) => (
            <Chip key={c} active={active === c} onClick={() => setActive(c)}>
              {c}
            </Chip>
          ))}
        </div>

        <div className="mt-3 flex flex-col gap-2.5 px-4">
          {list.map((s) => {
            const inCart = has(s.id);
            return (
              <article
                key={s.id}
                className="rounded-[14px] border-[0.5px] border-hairline bg-card p-3"
              >
                <button
                  type="button"
                  onClick={() => navigate(`/services/${s.id}`)}
                  className="flex w-full items-start gap-3 text-left"
                >
                  <div
                    className="flex h-[56px] w-[56px] flex-shrink-0 items-center justify-center rounded-[12px]"
                    style={{ backgroundColor: s.thumbBg }}
                  >
                    <ServiceIcon name={s.icon} className="h-6 w-6 opacity-30" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 truncate text-[13px] font-medium text-ink">
                      {s.name}
                    </div>
                    <div className="mb-1.5 line-clamp-2 text-[11px] leading-tight text-ink-light">
                      {s.desc}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-ink-light">
                      <Clock className="h-3 w-3" strokeWidth={1.5} />
                      {s.durationMin} min
                      <span className="h-2 w-px bg-hairline" />
                      <span className="font-serif text-[14px] text-gold">
                        ₹{s.price}
                      </span>
                    </div>
                  </div>
                </button>

                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleAdd(s)}
                    aria-pressed={inCart}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-full border-[0.5px] py-2.5 text-[11px] uppercase tracking-[0.08em] transition-colors ${
                      inCart
                        ? "border-gold bg-gold-pale text-gold"
                        : "border-ink/20 bg-cream text-ink hover:border-ink/40"
                    }`}
                  >
                    {inCart ? (
                      <>
                        <Check className="h-3.5 w-3.5" strokeWidth={2} />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                        Add
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBookNow(s)}
                    className="flex-1 rounded-full bg-ink py-2.5 text-[11px] uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-90"
                  >
                    Book now
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="h-5" />
      </div>
      <CartBar />
      <BottomNav />
    </PhoneFrame>
  );
};

export default Services;
