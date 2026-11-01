import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Plane } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isSignUp = mode === "signup";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error } = isSignUp
      ? await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        })
      : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    if (data.session) navigate({ to: "/app", replace: true });
    else setError("請到信箱確認帳號 / Check your email to confirm.");
  }

  const input =
    "w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero px-4">
      <div className="fade-up w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-glow">
        <Link to="/" className="mb-6 flex items-center gap-2 font-semibold">
          <Plane className="h-5 w-5 text-primary" /> Flight Price Notifier
        </Link>
        <h1 className="text-2xl font-bold">{isSignUp ? "建立帳號 / Sign up" : "登入 / Sign in"}</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input className={input} type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          <input className={input} type="password" required minLength={6} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={isSignUp ? "new-password" : "current-password"} />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button disabled={loading} className="w-full rounded-lg bg-gradient-primary py-3 font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 disabled:opacity-60">
            {loading ? "…" : isSignUp ? "Sign up" : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isSignUp ? (
            <>已有帳號？ <Link to="/auth" className="text-primary hover:underline">Sign in</Link></>
          ) : (
            <>還沒有帳號？ <Link to="/signup" className="text-primary hover:underline">Sign up</Link></>
          )}
        </p>
      </div>
    </div>
  );
}
