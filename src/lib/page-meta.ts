import { useEffect } from "react";

export type PageMetaEntry =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string };

// Applies per-page <title> and <meta> tags on the client. Defaults live in index.html.
export function applyPageMeta(entries: PageMetaEntry[]) {
  for (const entry of entries) {
    if ("title" in entry) {
      document.title = entry.title;
      continue;
    }
    const attr = "name" in entry ? "name" : "property";
    const key = "name" in entry ? entry.name : entry.property;
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", entry.content);
  }
}

export function usePageMeta(entries: PageMetaEntry[]) {
  useEffect(() => {
    applyPageMeta(entries);
  }, [entries]);
}
