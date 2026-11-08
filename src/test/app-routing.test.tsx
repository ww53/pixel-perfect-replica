import { matchRoutes } from "react-router";
import { describe, expect, it } from "vitest";

import { router } from "@/router";

// Match routes without rendering: pages may need network access the test run lacks.
describe("App routing", () => {
  it("matches the index page for / instead of falling back to not found", () => {
    const matches = matchRoutes(router.routes, "/");
    expect(matches?.at(-1)?.route.index).toBe(true);
  });

  it.each(["/auth", "/signup", "/app"])("matches a real page for %s", (path) => {
    const matches = matchRoutes(router.routes, path);
    expect(matches?.at(-1)?.route.path).toBe(path.slice(1));
  });

  it("falls back to the not-found route for unknown paths", () => {
    const matches = matchRoutes(router.routes, "/does-not-exist");
    expect(matches?.at(-1)?.route.path).toBe("*");
  });
});
