import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { PhoneFrame } from "@/components/salon/PhoneFrame";
import { StatusBar } from "@/components/salon/StatusBar";
import { TopBar, IconButton } from "@/components/salon/TopBar";
import { BottomNav } from "@/components/salon/BottomNav";
import { stylists } from "@/data/mockData";
import { useCart } from "@/hooks/useCart";

// April 2026 layout — week starts Monday. Mar 30/31 spill, days 1–30.
const calendarRows: Array<Array<{ day: number | null; dim: boolean }>> = [
  [
    { day: null, dim: true }, { day: null, dim: true }, { day: 1, dim: false },
    { day: 2, dim: false }, { day: 3, dim: false }, { day: 4, dim: true }, { day: 5, dim: true },
  ],
  [
    { day: 6, dim: false }, { day: 7, dim: false }, { day: 8, dim: false },
    { day: 9, dim: false }, { day: 10, dim: false }, { day: 11, dim: true }, { day: 12, dim: true },
  ],
  [
    { day: 13, dim: false }, { day: 14, dim: false }, { day: 15, dim: false },
    { day: 16, dim: false }, { day: 17, dim: false }, { day: 18, dim: true }, { day: 19, dim: true },
  ],
  [
    { day: 20, dim: false }, { day: 21, dim: false }, { day: 22, dim: false },
    { day: 23, dim: false }, { day: 24, dim: false }, { day: 25, dim: true }, { day: 26, dim: true },
  ],
  [
    { day: 27, dim: false }, { day: 28, dim: false }, { day: 29, dim: false },
    { day: 30, dim: false }, { day: null, dim: true }, { day: null, dim: true }, { day: null, dim: true },
  ],
];

const TODAY = 15;

// Each slot has a max duration it can accommodate (mins)
type Slot = { time: string; capacity: number };
const baseSlots: Slot[] = [
  { time: "9:00 AM", capacity: 240 },
  { time: "11:00 AM", capacity: 180 },
  { time: "1:00 PM", capacity: 120 },
  { time: "2:00 PM", capacity: 60 },
  { time: "3:00 PM", capacity: 150 },
  { time: "4:00 PM", capacity: 90 },
];

const ANY_STYLIST = "any";

const steps = ["Stylist", "Date", "Time", "Confirm"] as const;
type Step = 0 | 1 | 2 | 3;

const Book = () => {
  const navigate = useNavigate();
  const { items, totalPrice, totalDuration, remove, clear } = useCart();

  const [step, setStep] = useState<Step>(0);
  const [stylistId, setStylistId] = useState<string>(ANY_STYLIST);
  const [day, setDay] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);

  // If a slot is selected but cart duration changes to no longer fit, clear it
  useEffect(() => {
    if (!slot) return;
    const s = baseSlots.find((b) => b.time === slot);
    if (s && totalDuration > s.capacity) setSlot(null);
  }, [totalDuration, slot]);

  const stylist =
    stylistId === ANY_STYLIST
      ? { id: ANY_STYLIST, name: "Any available", role: "Best match" }
      : stylists.find((s) => s.id === stylistId)!;

  const fittingSlots = useMemo(
    () => baseSlots.map((s) => ({ ...s, fits: s.capacity >= totalDuration && totalDuration > 0 })),
    [totalDuration],
  );
  const noSlotsFit = totalDuration > 0 && fittingSlots.every((s) => !s.fits);

  const canNext =
    items.length > 0 &&
    (step === 0
      ? !!stylistId
      : step === 1
      ? day !== null
      : step === 2
      ? slot !== null
      : true);

  const next = () => setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
  const back = () => {
    if (step === 0) navigate(-1);
    else setStep((s) => ((s - 1) as Step));
  };

  const confirm = () => {
    toast.success("Appointment confirmed", {
      description: `${items.length} ritual${items.length > 1 ? "s" : ""} · ${stylist.name} · Apr ${day} · ${slot}`,
    });
    clear();
    setStep(0);
    setDay(null);
    setSlot(null);
    setStylistId(ANY_STYLIST);
    navigate("/");
  };

  // Empty cart guard
  if (items.length === 0) {
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
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
          <div className="font-serif text-[24px] font-light text-ink">
            No rituals <em className="italic text-gold">selected</em>
          </div>
          <p className="text-[12px] leading-[1.6] text-ink-light">
            Browse the menu and add at least one ritual to begin your booking.
          </p>
          <Link
            to="/services"
            className="mt-3 rounded-full bg-ink px-6 py-3 text-[11px] uppercase tracking-[0.1em] text-white"
          >
            Browse rituals
          </Link>
        </div>
        <BottomNav />
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <StatusBar />
      <TopBar
        left={
          <IconButton ariaLabel="Back" onClick={back}>
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          </IconButton>
        }
        right={<div className="w-9" />}
      />

      {/* Progress */}
      <div className="px-5 pt-3">
        <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.1em] text-ink-light">
          <span>Step {step + 1} of {steps.length}</span>
          <span className="text-ink">{steps[step]}</span>
        </div>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-[3px] flex-1 rounded-full transition-colors ${
                i <= step ? "bg-gold" : "bg-hairline"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-4 pt-4">
        {/* Cart strip — always visible during flow */}
        <div className="mx-4 mb-4 rounded-[14px] border-[0.5px] border-hairline bg-card p-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.1em] text-gold">
              Your selection
            </div>
            <div className="text-[10px] text-ink-light">
              {items.length} · {totalDuration} min · ₹{totalPrice}
            </div>
          </div>
          <ul className="flex flex-col gap-1.5">
            {items.map((it) => (
              <li
                key={it.id}
                className="flex items-center gap-2 rounded-[10px] bg-cream px-2.5 py-1.5"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px] font-medium text-ink">{it.name}</div>
                  <div className="text-[10px] text-ink-light">
                    {it.durationMin} min · ₹{it.price}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => remove(it.id)}
                  aria-label={`Remove ${it.name}`}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-ink-light hover:bg-hairline hover:text-ink"
                >
                  <X className="h-3 w-3" strokeWidth={1.5} />
                </button>
              </li>
            ))}
          </ul>
          <Link
            to="/services"
            className="mt-2 block text-center text-[11px] tracking-[0.04em] text-gold hover:underline"
          >
            + Add another ritual
          </Link>
        </div>

        {/* Step content */}
        {step === 0 && (
          <section className="px-4">
            <h2 className="px-1 pb-2 text-[13px] font-medium text-ink">Select stylist</h2>

            <button
              type="button"
              onClick={() => setStylistId(ANY_STYLIST)}
              className={`mb-2 flex w-full items-center gap-3 rounded-[14px] border bg-card p-3 text-left transition-all ${
                stylistId === ANY_STYLIST
                  ? "border-[1.5px] border-gold"
                  : "border-[0.5px] border-hairline"
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale">
                <Sparkles className="h-5 w-5 text-gold" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-ink">Any available</div>
                <div className="text-[10px] text-ink-light">
                  We'll pair you with the best match
                </div>
              </div>
              {stylistId === ANY_STYLIST && (
                <Check className="h-4 w-4 text-gold" strokeWidth={2} />
              )}
            </button>

            <div className="grid grid-cols-2 gap-2">
              {stylists.map((s) => {
                const sel = s.id === stylistId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStylistId(s.id)}
                    className={`overflow-hidden rounded-[14px] bg-card text-left transition-all ${
                      sel ? "border-[1.5px] border-gold" : "border-[0.5px] border-hairline"
                    }`}
                  >
                    <div
                      className="flex h-20 items-center justify-center"
                      style={{ backgroundColor: s.swatch }}
                    >
                      <User className="h-7 w-7 text-ink/25" strokeWidth={1} />
                    </div>
                    <div className="px-2.5 pb-2 pt-1.5">
                      <div className="text-[11px] font-medium text-ink">{s.name}</div>
                      <div className="text-[9px] uppercase tracking-[0.05em] text-gold">
                        {s.role}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 1 && (
          <section className="px-4">
            <h2 className="px-1 pb-2 text-[13px] font-medium text-ink">Select date</h2>
            <div className="rounded-[14px] border-[0.5px] border-hairline bg-card p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-serif text-[18px] font-normal text-ink">April 2026</span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    aria-label="Previous month"
                    className="flex h-7 w-7 items-center justify-center rounded-full border-[0.5px] border-hairline bg-cream text-ink-mid"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next month"
                    className="flex h-7 w-7 items-center justify-center rounded-full border-[0.5px] border-hairline bg-cream text-ink-mid"
                  >
                    <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-[3px]">
                {["M", "T", "W", "T", "F", "S", "S"].map((h, i) => (
                  <div
                    key={i}
                    className="pb-1 text-center text-[9px] uppercase tracking-[0.06em] text-ink-light"
                  >
                    {h}
                  </div>
                ))}
                {calendarRows.flat().map((c, i) => {
                  if (c.day === null) return <div key={i} />;
                  const isSel = c.day === day && !c.dim;
                  const isToday = c.day === TODAY;
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={c.dim}
                      onClick={() => !c.dim && setDay(c.day!)}
                      className={`px-0.5 py-2 text-center text-[12px] transition-colors ${
                        isSel
                          ? "rounded-full bg-ink text-white"
                          : c.dim
                          ? "text-hairline"
                          : isToday
                          ? "rounded-lg font-medium text-gold"
                          : "rounded-lg text-ink-mid hover:bg-cream-dark"
                      }`}
                    >
                      {c.day}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="px-4">
            <div className="mb-2 flex items-baseline justify-between px-1">
              <h2 className="text-[13px] font-medium text-ink">Available times</h2>
              <span className="text-[10px] text-ink-light">
                Need {totalDuration} min
              </span>
            </div>

            {noSlotsFit ? (
              <div className="rounded-[14px] border-[0.5px] border-dashed border-hairline bg-card p-5 text-center">
                <div className="mb-1 font-serif text-[15px] text-ink">
                  No slots fit your selection
                </div>
                <p className="mb-3 text-[11px] leading-[1.6] text-ink-light">
                  Your {totalDuration}-minute booking won't fit any time on Apr {day}.
                  Try another date or remove a ritual.
                </p>
                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-full border-[0.5px] border-ink/20 px-4 py-2 text-[11px] uppercase tracking-[0.08em] text-ink"
                  >
                    Change date
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-1.5">
                {fittingSlots.map((s) => {
                  const sel = s.time === slot && s.fits;
                  return (
                    <button
                      key={s.time}
                      type="button"
                      disabled={!s.fits}
                      onClick={() => s.fits && setSlot(s.time)}
                      className={`rounded-[10px] border-[0.5px] py-2.5 text-center text-[11px] transition-colors ${
                        sel
                          ? "border-ink bg-ink text-white"
                          : !s.fits
                          ? "border-hairline bg-card text-hairline line-through"
                          : "border-hairline bg-card text-ink-mid hover:border-ink/50"
                      }`}
                    >
                      {s.time}
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {step === 3 && (
          <section className="px-4">
            <h2 className="px-1 pb-2 text-[13px] font-medium text-ink">
              Confirm your appointment
            </h2>
            <div className="rounded-[14px] border-[0.5px] border-hairline bg-card p-4">
              {[
                ["Stylist", stylist.name],
                ["Date", `Apr ${day}, 2026`],
                ["Time", slot ?? "—"],
                ["Total duration", `${totalDuration} mins`],
              ].map(([k, v]) => (
                <div key={k} className="mb-2 flex justify-between">
                  <span className="text-[11px] text-ink-light">{k}</span>
                  <span className="text-[12px] font-medium text-ink">{v}</span>
                </div>
              ))}
              <div className="my-3 h-px bg-hairline" />
              <div className="mb-2 text-[10px] uppercase tracking-[0.1em] text-gold">
                Rituals ({items.length})
              </div>
              <ul className="mb-3 flex flex-col gap-1">
                {items.map((it) => (
                  <li key={it.id} className="flex justify-between text-[12px]">
                    <span className="truncate pr-2 text-ink">{it.name}</span>
                    <span className="flex-shrink-0 font-serif text-gold">₹{it.price}</span>
                  </li>
                ))}
              </ul>
              <div className="my-2 h-px bg-hairline" />
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-ink">Total</span>
                <span className="font-serif text-[22px] text-gold">₹{totalPrice}</span>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Sticky footer CTA */}
      <div className="sticky bottom-0 z-10 border-t-[0.5px] border-hairline bg-cream/95 px-4 py-3 backdrop-blur-sm">
        <div className="mb-2 flex items-center justify-between text-[11px] text-ink-light">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" strokeWidth={1.5} />
            {totalDuration} min
          </span>
          <span className="font-serif text-[16px] text-gold">₹{totalPrice}</span>
        </div>
        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            className="w-full rounded-full bg-ink py-3.5 text-[12px] uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={confirm}
            className="w-full rounded-full bg-ink py-3.5 text-[12px] uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
          >
            Confirm booking
          </button>
        )}
      </div>

      <BottomNav />
    </PhoneFrame>
  );
};

export default Book;
