type Props = { tone?: "light" | "dark" };

export const StatusBar = ({ tone = "light" }: Props) => {
  const isDark = tone === "dark";
  return (
    <div
      className={`flex items-center justify-between px-5 pb-1 pt-2.5 ${
        isDark ? "bg-ink" : "bg-cream"
      }`}
    >
      <span className={`text-[11px] ${isDark ? "text-white/50" : "text-ink-mid"}`}>9:41</span>
      <span className={`text-[11px] tracking-widest ${isDark ? "text-white/50" : "text-ink-mid"}`}>
        ●●●
      </span>
    </div>
  );
};
