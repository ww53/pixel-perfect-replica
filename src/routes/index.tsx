import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BellRing, Plane, Radar, XCircle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Price Notifier — 機票降價通知" },
      { name: "description", content: "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops." },
      { property: "og:title", content: "Flight Price Notifier — 機票降價通知" },
      { property: "og:description", content: "Set a route and a target price — we email you when the fare drops." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  { icon: Radar, title: "盯緊熱門航線 (Always-on route watching)", body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。" },
  { icon: BellRing, title: "達標自動通知 (Target-price email alerts)", body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。" },
  { icon: XCircle, title: "隨時取消 (Cancel anytime)", body: "月訂閱制，不想用隨時停，沒有綁約。" },
];

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={shown ? "fade-up" : "opacity-0"} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-hero">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <span className="flex items-center gap-2 font-semibold">
          <Plane className="h-5 w-5 text-primary" /> Flight Price Notifier
        </span>
        <Link to="/auth" className="rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
          Sign in / 登入
        </Link>
      </header>

      <main className="flex-1">
        <section className="fade-up mx-auto max-w-4xl px-6 pb-24 pt-20 text-center md:pt-32">
          <p className="mb-5 inline-block rounded-full border border-border bg-card px-4 py-1 text-xs text-muted-foreground">機票降價通知</p>
          <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
            <span className="text-gradient">Flight Price</span> Notifier
          </h1>
          <p className="mt-6 text-xl font-medium md:text-2xl">設定航線與目標價，機票降價就通知你</p>
          <p className="mt-3 text-muted-foreground">Set a route and a target price — we email you when the fare drops.</p>
          <Link to="/signup" className="mt-10 inline-block rounded-lg bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
            免費開始 / Get started
          </Link>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-28 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 120}>
              <div className="h-full rounded-2xl border border-border bg-card p-7 transition hover:border-primary/60">
                <div className="mb-5 inline-flex rounded-xl bg-accent p-3">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-3 text-muted-foreground">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">© 2026 Flight Price Notifier</footer>
    </div>
  );
}
