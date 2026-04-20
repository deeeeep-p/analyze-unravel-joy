import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { toast } from "sonner";
import { PhoneFrame } from "@/components/salon/PhoneFrame";
import { StatusBar } from "@/components/salon/StatusBar";
import { TopBar } from "@/components/salon/TopBar";
import { BottomNav } from "@/components/salon/BottomNav";
import { stylists, services } from "@/data/mockData";

// April 2026 layout — week starts Monday. Mar 30/31 spill, days 1–30.
const calendarRows: Array<Array<{ day: number | null; dim: boolean }>> = [
  [
    { day: null, dim: true },
    { day: null, dim: true },
    { day: 1, dim: false },
    { day: 2, dim: false },
    { day: 3, dim: false },
    { day: 4, dim: true },
    { day: 5, dim: true },
  ],
  [
    { day: 6, dim: false },
    { day: 7, dim: false },
    { day: 8, dim: false },
    { day: 9, dim: false },
    { day: 10, dim: false },
    { day: 11, dim: true },
    { day: 12, dim: true },
  ],
  [
    { day: 13, dim: false },
    { day: 14, dim: false },
    { day: 15, dim: false },
    { day: 16, dim: false },
    { day: 17, dim: false },
    { day: 18, dim: true },
    { day: 19, dim: true },
  ],
  [
    { day: 20, dim: false },
    { day: 21, dim: false },
    { day: 22, dim: false },
    { day: 23, dim: false },
    { day: 24, dim: false },
    { day: 25, dim: true },
    { day: 26, dim: true },
  ],
  [
    { day: 27, dim: false },
    { day: 28, dim: false },
    { day: 29, dim: false },
    { day: 30, dim: false },
    { day: null, dim: true },
    { day: null, dim: true },
    { day: null, dim: true },
  ],
];

const TODAY = 15;

type Slot = { time: string; unavailable?: boolean };
const slots: Slot[] = [
  { time: "9:00 AM" },
  { time: "11:00 AM" },
  { time: "1:00 PM" },
  { time: "2:00 PM", unavailable: true },
  { time: "3:00 PM" },
  { time: "4:00 PM", unavailable: true },
];

const service = services[0];

const Book = () => {
  const [stylistId, setStylistId] = useState("elena");
  const [day, setDay] = useState(20);
  const [slot, setSlot] = useState("11:00 AM");
  const stylist = stylists.find((s) => s.id === stylistId)!;

  const confirm = () => {
    toast.success("Appointment confirmed", {
      description: `${service.name} · ${stylist.name} · Apr ${day} · ${slot}`,
    });
  };

  return (
    <PhoneFrame>
      <StatusBar />
      <TopBar
        left={
          <Link
            to="/services"
            className="flex items-center gap-1 text-[13px] tracking-[0.04em] text-ink-light"
          >
            ← Back
          </Link>
        }
        right={<div className="w-9" />}
      />

      <div className="flex-1 overflow-y-auto pb-4">
        <div className="px-5 pb-1 pt-4">
          <div className="mb-1 text-[9px] uppercase tracking-[0.12em] text-ink-light">
            Reserve your time
          </div>
          <h1 className="font-serif text-[28px] font-light leading-[1.1] text-ink">
            Book a <em className="italic">ritual</em>
          </h1>
        </div>

        {/* Stylists */}
        <div className="flex items-baseline justify-between px-5 pb-1.5 pt-4">
          <span className="text-[13px] font-medium text-ink">Select stylist</span>
          <span className="text-[11px] text-ink-light">{stylists.length} experts</span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto px-4 pb-1 scrollbar-none">
          {stylists.map((s) => {
            const sel = s.id === stylistId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStylistId(s.id)}
                className={`w-[100px] flex-shrink-0 overflow-hidden rounded-[14px] bg-card text-left transition-all ${
                  sel
                    ? "border-[1.5px] border-gold"
                    : "border-[0.5px] border-hairline"
                }`}
              >
                <div
                  className="flex h-20 items-center justify-center"
                  style={{ backgroundColor: s.swatch }}
                >
                  <User className="h-7 w-7 text-ink/25" strokeWidth={1} />
                </div>
                <div className="px-2 pb-2 pt-1.5">
                  <div className="text-[11px] font-medium text-ink">{s.name}</div>
                  <div className="text-[9px] uppercase tracking-[0.05em] text-gold">
                    {s.role}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mx-5 my-4 h-px bg-hairline" />

        {/* Calendar */}
        <div className="px-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-serif text-[18px] font-normal text-ink">April 2026</span>
            <div className="flex gap-1.5">
              <button
                type="button"
                aria-label="Previous month"
                className="flex h-7 w-7 items-center justify-center rounded-full border-[0.5px] border-hairline bg-card text-ink-mid"
              >
                <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label="Next month"
                className="flex h-7 w-7 items-center justify-center rounded-full border-[0.5px] border-hairline bg-card text-ink-mid"
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
                  className={`px-0.5 py-1.5 text-center text-[12px] transition-colors ${
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

        {/* Times */}
        <div className="flex items-center justify-between px-4 pb-2 pt-4">
          <span className="text-[13px] font-medium text-ink">Available times</span>
          <span className="text-[11px] text-ink-light">Mon, Apr {day}</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 px-4">
          {slots.map((s) => {
            const sel = s.time === slot && !s.unavailable;
            return (
              <button
                key={s.time}
                type="button"
                disabled={s.unavailable}
                onClick={() => !s.unavailable && setSlot(s.time)}
                className={`rounded-[10px] border-[0.5px] py-2.5 text-center text-[11px] transition-colors ${
                  sel
                    ? "border-ink bg-ink text-white"
                    : s.unavailable
                    ? "border-hairline bg-card text-hairline"
                    : "border-hairline bg-card text-ink-mid hover:border-ink/50"
                }`}
              >
                {s.time}
              </button>
            );
          })}
        </div>

        {/* Summary */}
        <div className="px-4 pb-2 pt-4">
          <div className="rounded-[14px] border-[0.5px] border-hairline bg-card p-4">
            <div className="mb-2.5 text-[9px] uppercase tracking-[0.1em] text-gold">
              Your booking
            </div>
            {[
              ["Service", service.name],
              ["Stylist", stylist.name],
              ["Date & time", `Apr ${day} · ${slot}`],
              ["Duration", `${service.durationMin} mins`],
            ].map(([k, v]) => (
              <div key={k} className="mb-1.5 flex justify-between">
                <span className="text-[11px] text-ink-light">{k}</span>
                <span className="text-[12px] font-medium text-ink">{v}</span>
              </div>
            ))}
            <div className="my-2 h-px bg-hairline" />
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-ink">Total</span>
              <span className="font-serif text-xl text-gold">₹{service.price}</span>
            </div>
          </div>
        </div>

        <div className="px-4 pt-2">
          <button
            type="button"
            onClick={confirm}
            className="w-full rounded-[24px] bg-ink py-3.5 text-[13px] uppercase tracking-[0.07em] text-white transition-opacity hover:opacity-90"
          >
            Confirm appointment
          </button>
        </div>
        <div className="h-5" />
      </div>

      <BottomNav />
    </PhoneFrame>
  );
};

export default Book;
