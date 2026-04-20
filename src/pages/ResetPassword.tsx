import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = z.string().min(6, "Minimum 6 characters").max(100).safeParse(password);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const { error: err } = await supabase.auth.updateUser({ password: parsed.data });
      if (err) throw err;
      toast.success("Password updated");
      navigate("/", { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Could not update password";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-cream-dark">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col bg-cream px-6 pt-16 shadow-[0_0_60px_-30px_hsl(var(--ink)/0.3)]">
        <div className="mb-10 text-center">
          <div className="font-serif text-[28px] tracking-[0.16em] text-ink">HIPSTER</div>
        </div>
        <h1 className="mb-1 font-serif text-[28px] font-light leading-[1.1] text-ink">
          Set a <em className="italic text-gold">new password</em>
        </h1>
        <p className="mb-7 text-[12px] text-ink-light">
          Choose something memorable — at least 6 characters.
        </p>
        <form onSubmit={submit} className="flex flex-col gap-3.5">
          <input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            className="w-full rounded-[12px] border-[0.5px] border-hairline bg-card px-4 py-3 text-[13px] text-ink outline-none focus:border-gold"
          />
          {error && <p className="text-[11px] text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="mt-2 w-full rounded-full bg-ink py-3.5 text-[12px] uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "…" : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
