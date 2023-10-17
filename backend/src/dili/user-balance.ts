import { AnkrProvider, GetAccountBalanceReply } from "@ankr.com/ankr.js";

//API KEY HERE
const provider = new AnkrProvider(
  "https://rpc.ankr.com/multichain/" + process.env.ANKR_API_KEY,
);

const balances = async (pk: string) => {
  const balance = await provider.getAccountBalance({
    blockchain: ["bsc", "eth", "polygon", "arbitrum", "optimism"],
    walletAddress: pk,
  });
  console.log("🚀 ~ file: user-balance.ts:14 ~ balances ~ balance:", balance);
  return balance;
};

interface Asset {
  blockchain: string;
  tokenName: string;
  tokenSymbol: string;
  balance: string;
  tokenType: string;
}

export const filterUserAssets = async (pk: string): Promise<Asset[]> => {
  const userAssets: GetAccountBalanceReply = await balances(pk);

  const nativeCoins = ["ETH", "BNB", "MATIC"];
  const stablecoins = ["USDT", "USDC", "DAI", "WETH"];

  if (userAssets.assets.length > 0) {
    const filteredAssets = userAssets.assets.filter((asset) => {
      if (
        nativeCoins.includes(asset.tokenSymbol) &&
        parseFloat(asset.balance) > 0
      ) {
        return true;
      }
      if (
        stablecoins.includes(asset.tokenSymbol) &&
        parseFloat(asset.balance) > 0
      ) {
        return true;
      }
      return false;
    });
    return filteredAssets;
  }

  return [];
};

// const userAssets: UserAssets = {
//   totalBalanceUsd: "12744.75384850401012631",
//   assets: [
//     {
//       blockchain: "eth",
//       tokenName: "Ether",
//       tokenSymbol: "ETHs",
//       balance: "5.71242122147",
//       tokenType: "NATIVE",
//     },
//     {
//       blockchain: "eth",
//       tokenName: "Dai Stablecoin",
//       tokenSymbol: "DAI",
//       balance: "1000",
//       tokenType: "ERC20",
//     },
//     {
//       blockchain: "bsc",
//       tokenName: "Tegro",
//       tokenSymbol: "TGR",
//       balance: "10",
//       tokenType: "ERC20",
//     },
//   ],
// };

// const filteredAssets = await filterUserAssets();
// console.log("filtered", filteredAssets);
