import { createBrowserRouter } from "react-router";

import { RootLayout, RootErrorElement, NotFoundPage } from "./routes/__root";
import { IndexPage } from "./routes/index";
import { SignInPage } from "./routes/auth";
import { SignUpPage } from "./routes/signup";
import { AuthenticatedLayout } from "./routes/_authenticated/route";
import { AppPage } from "./routes/_authenticated/app";

// Client-side routes. Static hosting falls back to index.html (see vercel.json),
// so deep links like /app resolve in the browser.
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootErrorElement />,
    children: [
      { index: true, element: <IndexPage /> },
      { path: "auth", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
      {
        // Pathless layout: everything nested here is behind the sign-in gate.
        element: <AuthenticatedLayout />,
        children: [{ path: "app", element: <AppPage /> }],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
