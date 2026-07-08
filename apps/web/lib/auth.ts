import { supabase } from "@/lib/supabase";

/**
 * Returns true when a Supabase session exists for the current browser client.
 */
export async function isLoggedIn(): Promise<boolean> {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    return false;
  }

  return Boolean(session);
}
