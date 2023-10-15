import { SupabaseClient } from "@supabase/supabase-js";
import { createContext, FC, ReactNode } from "react";
import { Database } from "../__generated__/supabase-types";

//TODO Put the below into environment variables
const SUPABASE_URL = "https://qbuoensvkofstuhnfxzn.supabase.co";
//The below key is safe to include in browsers if we have row level security enabled on our tables
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidW9lbnN2a29mc3R1aG5meHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczMTIxMDksImV4cCI6MjAxMjg4ODEwOX0.d7WKH6x2tRcyh42ydu7GVI148PjoFS1BEOc4Adzo7dA";
const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_KEY);
export const SupabaseContext =
  createContext<SupabaseClient<Database>>(supabase);

export const SupabaseProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <SupabaseContext.Provider value={supabase}>
    {children}
  </SupabaseContext.Provider>
);
