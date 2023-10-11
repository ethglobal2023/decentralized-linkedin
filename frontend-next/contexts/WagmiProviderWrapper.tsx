"use client";
import {
  configureChains,
  createConfig,
  mainnet,
  sepolia,
  WagmiConfig,
} from "wagmi";
import { connectorsForWallets, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React, { ReactNode } from "react";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import {
  arbitrum,
  base,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
} from "viem/chains";
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet
} from "@rainbow-me/rainbowkit/wallets";

const projectId = "f3b8ea84247122bc77e28b7b91edf3d8";
const appName = "XMTP React Quickstart";



const { chains, publicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    polygonMumbai,
    sepolia,
    optimismGoerli,
  ],
  [
    infuraProvider({ apiKey: "b46a8b93584e410e8a0d353a9a2b4f1a" }), //TODO Put this into a env file or use a public RPC url
    publicProvider(),
  ],
);
//
// const { connectors } = getDefaultWallets({
//   appName: "My RainbowKit DisconnectOnSignout",
//   projectId: "YOUR_PROJECT_ID",
//   chains,
// });


const connectors = connectorsForWallets([
  {

    groupName: "Wallets",
    wallets: [
      // Alpha order
      coinbaseWallet({ appName, chains }),
      metaMaskWallet({ chains, projectId }),
      rainbowWallet({ chains, projectId }),
      trustWallet({ projectId, chains }),
      walletConnectWallet({ chains, projectId }),
    ],
  },
]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
export const WagmiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
