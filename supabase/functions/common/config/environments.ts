const isProd = Deno.env.get("SUPABASE_URL") !== undefined;

export const env = {
    SUPABASE_PROJECT_URL: isProd
        ? Deno.env.get("SUPABASE_URL")!
        : Deno.env.get("SUPABASE_PROJECT_URL")!,

    SUPABASE_API_KEY: isProd
        ? Deno.env.get("SUPABASE_ANON_KEY")!
        : Deno.env.get("SUPABASE_API_KEY")!,

    INSURANCE_API: Deno.env.get("INSURANCE_API")!,
};
