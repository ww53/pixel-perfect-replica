import { AuthForm } from "@/components/AuthForm";
import { usePageMeta, type PageMetaEntry } from "@/lib/page-meta";

const meta: PageMetaEntry[] = [
  { title: "Sign in — Flight Price Notifier" },
  { name: "description", content: "Sign in to manage your flight price alerts." },
  { property: "og:title", content: "Sign in — Flight Price Notifier" },
  { property: "og:description", content: "Sign in to manage your flight price alerts." },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary" },
];

export function SignInPage() {
  usePageMeta(meta);
  return <AuthForm mode="signin" />;
}
