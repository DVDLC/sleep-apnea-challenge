import { createClient } from "jsr:@supabase/supabase-js@2";
import { Database } from "./database.types.ts";

export const supabase = createClient<Database>(
    "https://tgcpucgteniwhldlcgcl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnY3B1Y2d0ZW5pd2hsZGxjZ2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2ODQyOTMsImV4cCI6MjA2MTI2MDI5M30.vmcSYVD3tft_HNp4WS1-7L0w1bnhvEJ7d9WykfwL4m8",
);
