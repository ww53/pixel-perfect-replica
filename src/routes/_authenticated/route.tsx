import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// Single gate for every page under src/routes/_authenticated/.
export function AuthenticatedLayout() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    let active = true;
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      if (active) setUser(data.user ?? null);
    };
    void check();
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      // Defer Supabase calls out of the auth callback to avoid re-entrancy.
      setTimeout(() => void check(), 0);
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  if (user === undefined) return null;
  if (user === null) return <Navigate to="/auth" replace />;
  return <Outlet context={{ user }} />;
}
