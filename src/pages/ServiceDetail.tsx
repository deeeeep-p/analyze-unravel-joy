import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Sparkles, Heart, Share2 } from "lucide-react";
import { PhoneFrame } from "@/components/salon/PhoneFrame";
import { StatusBar } from "@/components/salon/StatusBar";
import { TopBar, IconButton } from "@/components/salon/TopBar";
import { BottomNav } from "@/components/salon/BottomNav";
import { ServiceIcon } from "@/components/salon/ServiceIcon";
import { services, trendingServices } from "@/data/mockData";

const allServices = [...services, ...trendingServices];

const perks = [
  "Complimentary welcome tea & refreshments",
  "Personalised consultation with your specialist",
  "Premium aromatherapy & sensory ritual",
  "Take-home care notes from your stylist",
];

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = allServices.find((s) => s.id === id);

  if (!service) {
    return (
      <PhoneFrame>
        <StatusBar />
        <TopBar
          left={
            <IconButton ariaLabel="Back" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </IconButton>
          }
        />
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
          <div className="font-serif text-[22px] text-ink">Ritual not found</div>
          <p className="text-[12px] text-ink-light">
            This experience may have been retired from our menu.
          </p>
          <Link
            to="/services"
            className="mt-2 rounded-full bg-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.1em] text-white"
          >
            Browse rituals
          </Link>
        </div>
        <BottomNav />
      </PhoneFrame>
    );
  }

  const related = allServices
    .filter((s) => s.id !== service.id && s.category === service.category)
    .slice(0, 2);

  return (
    <PhoneFrame>
      <StatusBar />
      <TopBar
        left={
          <IconButton ariaLabel="Back" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          </IconButton>
        }
        right={
          <div className="flex items-center gap-2">
            <IconButton ariaLabel="Save">
              <Heart className="h-4 w-4" strokeWidth={1.5} />
            </IconButton>
            <IconButton ariaLabel="Share">
              <Share2 className="h-4 w-4" strokeWidth={1.5} />
            </IconButton>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Hero */}
        <div
          className="relative mx-4 mt-2 flex h-56 items-center justify-center overflow-hidden rounded-[18px]"
          style={{ backgroundColor: service.thumbBg }}
        >
          <div className="absolute -bottom-8 -right-6 h-32 w-32 rounded-full border-[0.5px] border-ink/10" />
          <div className="absolute -bottom-12 -right-2 h-40 w-40 rounded-full border-[0.5px] border-ink/5" />
          <ServiceIcon name={service.icon} className="h-20 w-20 opacity-30" />
          <div className="absolute left-4 top-4 rounded-full bg-cream/80 px-2.5 py-1 backdrop-blur-sm">
            <span className="text-[9px] uppercase tracking-[0.12em] text-ink">
              {service.category}
            </span>
          </div>
        </div>

        {/* Title block */}
        <div className="px-5 pb-3 pt-5">
          <div className="mb-1 text-[9px] uppercase tracking-[0.14em] text-gold">
            Signature ritual
          </div>
          <h1 className="font-serif text-[26px] font-light leading-[1.1] text-ink">
            {service.name.split(" ").slice(0, -1).join(" ")}{" "}
            <em className="italic text-gold">
              {service.name.split(" ").slice(-1)}
            </em>
          </h1>

          <div className="mt-3 flex items-center gap-4 text-[11px] text-ink-light">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
              {service.durationMin} min
            </div>
            <div className="h-3 w-px bg-hairline" />
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
              By appointment
            </div>
          </div>
        </div>

        <div className="mx-5 my-2 h-px bg-hairline" />

        {/* Description */}
        <div className="px-5 py-3">
          <h2 className="mb-2 text-[10px] uppercase tracking-[0.12em] text-ink-light">
            The experience
          </h2>
          <p className="text-[13px] leading-[1.6] text-ink-mid">
            {service.desc}. A slow, intentional ritual performed by our most
            seasoned specialists, blending classical technique with contemporary
            care. Every detail is curated — from the lighting and music to the
            botanicals warmed beside you — to leave you visibly renewed and
            quietly transformed.
          </p>
        </div>

        {/* Perks */}
        <div className="px-5 py-3">
          <h2 className="mb-3 text-[10px] uppercase tracking-[0.12em] text-ink-light">
            What's included
          </h2>
          <ul className="flex flex-col gap-2.5">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[12px] text-ink-mid">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="px-5 py-3">
            <h2 className="mb-3 text-[10px] uppercase tracking-[0.12em] text-ink-light">
              You may also love
            </h2>
            <div className="flex flex-col gap-2">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/services/${r.id}`}
                  className="flex items-center gap-3 rounded-[12px] border-[0.5px] border-hairline bg-card p-2.5 transition-transform active:scale-[0.99]"
                >
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[10px]"
                    style={{ backgroundColor: r.thumbBg }}
                  >
                    <ServiceIcon name={r.icon} className="h-5 w-5 opacity-30" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[12px] font-medium text-ink">{r.name}</div>
                    <div className="text-[10px] text-ink-light">{r.durationMin} min</div>
                  </div>
                  <span className="font-serif text-[15px] text-gold">₹{r.price}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="absolute inset-x-0 bottom-[68px] border-t-[0.5px] border-hairline bg-cream/95 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="text-[9px] uppercase tracking-[0.1em] text-ink-light">From</div>
            <div className="font-serif text-[22px] leading-none text-gold">
              ₹{service.price}
            </div>
          </div>
          <Link
            to="/book"
            className="flex-1 rounded-full bg-ink py-3 text-center text-[12px] uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
          >
            Book this ritual
          </Link>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
};

export default ServiceDetail;
