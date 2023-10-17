import axios from "axios";
const fs = require("fs");

export async function readWeb3ProfileDownloadedJSON() {
  const batchSize = 1000;
  const lastUserId = 14200;
  const fpath =
    "../../../../airstack_socialprofiles_with_gitcoinpassport_and_poaps.json";

  const big_json = fs.readFileSync(fpath);

  1 === 1;
}
