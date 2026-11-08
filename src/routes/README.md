# Routes

This is a client-side SPA using **React Router**. Routes are declared explicitly in
`src/router.tsx`; files in this directory are just page and layout components.

| File | URL |
| --- | --- |
| `__root.tsx` | app shell (`RootLayout`), error element, 404 page — preserve `<Outlet />` |
| `index.tsx` | `/` |
| `auth.tsx` | `/auth` (sign in) |
| `signup.tsx` | `/signup` |
| `_authenticated/route.tsx` | auth gate layout — redirects to `/auth` when signed out |
| `_authenticated/app.tsx` | `/app` |

To add a protected page, put it under `_authenticated/` and register it as a child of
the `AuthenticatedLayout` route in `src/router.tsx`. Per-page `<title>`/`<meta>` are set
with `usePageMeta` from `src/lib/page-meta.ts`.
