import { fetchAllUsers } from "./index.js";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with your project URL and API key
const supabase = createClient(
  "https://qbuoensvkofstuhnfxzn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidW9lbnN2a29mc3R1aG5meHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MDc3MTksImV4cCI6MjAxMjM4MzcxOX0.WiGeLc4r2OZhX_4bkIUeAOGjq-cXGmBN65i2qXfPnn4"
);

async function pushUserDataToSupabase() {
  try {
    const users = await fetchAllUsers();
    console.log(
      "🚀 ~ file: create-table.ts:13 ~ pushUserDataToSupabase ~ users:",
      users
    );
    // Loop through the users and insert each one into the table
    for (const user of users) {
      const { address, id, cid, ...document } = user;
      const documentJson = JSON.stringify(document);
      console.log(
        "🚀 ~ file: create-table.ts:21 ~ pushUserDataToSupabase ~ documentJson:",
        documentJson
      );
      const { data, error } = await supabase
        .from("talent_layer") // Replace with the actual table name
        .upsert([
          {
            id,
            cid,
            address,
            document: documentJson,
          },
        ]);

      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log("Data inserted successfully:", data);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the function to push user data to Supabase
pushUserDataToSupabase().then(() => {
  console.log("Data push completed");
});
