import { createClient } from "jsr:@supabase/supabase-js@2";
import { env } from "../environments.ts";

export const supabase = createClient(
    env.SUPABASE_PROJECT_URL,
    env.SUPABASE_API_KEY,
);
