import { Link, useNavigate, useOutletContext } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Plane } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { usePageMeta, type PageMetaEntry } from "@/lib/page-meta";

const meta: PageMetaEntry[] = [
  { title: "Dashboard — Flight Price Notifier" },
  { name: "description", content: "Your flight route tracking dashboard." },
  { property: "og:title", content: "Dashboard — Flight Price Notifier" },
  { property: "og:description", content: "Your flight route tracking dashboard." },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary" },
];

export function AppPage() {
  usePageMeta(meta);
  const { user } = useOutletContext<{ user: User }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Plane className="h-5 w-5 text-primary" /> Flight Price Notifier
        </Link>
        <button onClick={signOut} className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-accent">
          Sign out / 登出
        </button>
      </header>
      <main className="fade-up mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">Hi {user.email}</h1>
        <div className="mt-8 rounded-2xl border border-border bg-card p-8">
          <p className="text-lg">你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Your dashboard is coming soon. Route-subscription will be added in the next milestone.
          </p>
        </div>
      </main>
    </div>
  );
}
