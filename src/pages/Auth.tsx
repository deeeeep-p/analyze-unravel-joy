import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const credSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "Minimum 6 characters").max(100),
});

type Mode = "signin" | "signup";

const Auth = () => {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate("/", { replace: true });
  }, [session, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = credSchema.safeParse({ email, password });
    if (!parsed.success) {
      const fe: { email?: string; password?: string } = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as "email" | "password";
        fe[k] = i.message;
      });
      setErrors(fe);
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      if (mode === "signup") {
        const redirectUrl = `${window.location.origin}/`;
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: redirectUrl },
        });
        if (error) throw error;
        toast.success("Welcome to HIPSTER", {
          description: "Check your inbox to confirm your email.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
        toast.success("Welcome back");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };

  const forgot = async () => {
    const parsed = z.string().email().safeParse(email);
    if (!parsed.success) {
      setErrors({ email: "Enter your email above first" });
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) toast.error(error.message);
    else toast.success("Reset link sent", { description: "Check your inbox." });
  };

  return (
    <div className="min-h-screen w-full bg-cream-dark">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col bg-cream px-6 pt-12 shadow-[0_0_60px_-30px_hsl(var(--ink)/0.3)]">
        <div className="mb-10 text-center">
          <div className="mb-2 font-serif text-[28px] tracking-[0.16em] text-ink">HIPSTER</div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink-light">
            The art of renewal
          </p>
        </div>

        <h1 className="mb-1 font-serif text-[30px] font-light leading-[1.1] text-ink">
          {mode === "signin" ? (
            <>
              Welcome <em className="italic text-gold">back</em>
            </>
          ) : (
            <>
              Begin your <em className="italic text-gold">ritual</em>
            </>
          )}
        </h1>
        <p className="mb-7 text-[12px] text-ink-light">
          {mode === "signin"
            ? "Sign in to continue your journey."
            : "Create your account to reserve your time."}
        </p>

        <form onSubmit={submit} className="flex flex-col gap-3.5">
          <div>
            <label className="mb-1.5 block text-[10px] uppercase tracking-[0.1em] text-ink-light">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[12px] border-[0.5px] border-hairline bg-card px-4 py-3 text-[13px] text-ink outline-none transition-colors focus:border-gold"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-[11px] text-destructive">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] uppercase tracking-[0.1em] text-ink-light">
              Password
            </label>
            <input
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[12px] border-[0.5px] border-hairline bg-card px-4 py-3 text-[13px] text-ink outline-none transition-colors focus:border-gold"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-[11px] text-destructive">{errors.password}</p>
            )}
          </div>

          {mode === "signin" && (
            <button
              type="button"
              onClick={forgot}
              className="self-end text-[11px] tracking-[0.04em] text-gold hover:underline"
            >
              Forgot password?
            </button>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-2 w-full rounded-full bg-ink py-3.5 text-[12px] uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center text-[12px] text-ink-light">
          {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setErrors({});
            }}
            className="text-gold hover:underline"
          >
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </div>

        <div className="mt-auto py-8 text-center text-[10px] uppercase tracking-[0.18em] text-ink-light">
          ✦ Atelier · Est. 2024
        </div>
      </div>
    </div>
  );
};

export default Auth;
