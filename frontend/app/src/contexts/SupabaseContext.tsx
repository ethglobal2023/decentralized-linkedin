import { SupabaseClient } from "@supabase/supabase-js";
import { createContext, FC, ReactNode } from "react";
import { Database } from "../__generated__/supabase-types";

//TODO Put the below into environment variables
const SUPABASE_URL = "https://qbuoensvkofstuhnfxzn.supabase.co";
//The below key is safe to include in browsers if we have row level security enabled on our tables
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidW9lbnN2a29mc3R1aG5meHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MDc3MTksImV4cCI6MjAxMjM4MzcxOX0.WiGeLc4r2OZhX_4bkIUeAOGjq-cXGmBN65i2qXfPnn4";
const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_KEY);
export const SupabaseContext =
  createContext<SupabaseClient<Database>>(supabase);

export const SupabaseProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <SupabaseContext.Provider value={supabase}>
    {children}
  </SupabaseContext.Provider>
);
