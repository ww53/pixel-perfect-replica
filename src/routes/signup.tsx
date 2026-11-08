import { AuthForm } from "@/components/AuthForm";
import { usePageMeta, type PageMetaEntry } from "@/lib/page-meta";

const meta: PageMetaEntry[] = [
  { title: "Sign up — Flight Price Notifier" },
  { name: "description", content: "Create an account to get emailed when fares drop." },
  { property: "og:title", content: "Sign up — Flight Price Notifier" },
  { property: "og:description", content: "Create an account to get emailed when fares drop." },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary" },
];

export function SignUpPage() {
  usePageMeta(meta);
  return <AuthForm mode="signup" />;
}
