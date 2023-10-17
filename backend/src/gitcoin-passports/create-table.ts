import { fetchGitcoinPassportUsers } from "./index.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_API_KEY!,
);

async function pushUserDataToSupabase() {
  try {
    const users = await fetchGitcoinPassportUsers();
    console.log(
      "🚀 ~ file: create-table.ts:13 ~ pushUserDataToSupabase ~ users:",
      users,
    );
    for (const user of users) {
      const { address, id, tokenId, score, ...document } = user;
      console.log(
        "🚀 ~ file: create-table.ts:18 ~ pushUserDataToSupabase ~ address:",
        address,
      );
      const documentJson = JSON.stringify(document);
      console.log(
        "🚀 ~ file: create-table.ts:21 ~ pushUserDataToSupabase ~ documentJson:",
        documentJson,
      );
      const { data, error } = await supabase.from("gitcoin_passports").upsert([
        {
          address,
          id,
          tokenId,
          score,
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

pushUserDataToSupabase().then(() => {
  console.log("Data push completed");
});
