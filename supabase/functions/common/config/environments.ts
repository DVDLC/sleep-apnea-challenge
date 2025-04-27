import { config } from "../deps.ts";

const cfg = config();

export const env = {
    INSURANCE_API: cfg.INSURANCE_API ?? "",
    SUPABASE_PROJECT_URL: cfg.SUPABASE_PROJECT_URL ?? "",
    SUPABASE_API_KEY: cfg.SUPABASE_API_KEY ?? "",
};
