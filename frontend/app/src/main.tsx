import "./polyfills";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  configureChains,
  createConfig,
  mainnet,
  sepolia,
  WagmiConfig,
} from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import {
  attachmentContentTypeConfig,
  reactionContentTypeConfig,
  readReceiptContentTypeConfig,
  replyContentTypeConfig,
  XMTPProvider,
} from "@xmtp/react-sdk";
import { RequireWalletConnected } from "./components/RequireWalletConnected";
import "@xmtp/react-components/styles.css";
import { WalletProvider } from "./contexts/WalletContext";
import "./index.css";
import { App } from "./components/App";
import { SupabaseProvider } from "./contexts/SupabaseContext";
import Navbar from "./components/Navbar";
import { Theme } from "@radix-ui/themes";

const DB_VERSION = 1;

const contentTypeConfigs = [
  attachmentContentTypeConfig,
  reactionContentTypeConfig,
  readReceiptContentTypeConfig,
  replyContentTypeConfig,
];

const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [
    infuraProvider({ apiKey: "b46a8b93584e410e8a0d353a9a2b4f1a" }),
    publicProvider(),
  ],
);

const projectId = "f3b8ea84247122bc77e28b7b91edf3d8";
const appName = "XMTP React Quickstart";

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

createRoot(document.getElementById("root") as HTMLElement).render(
  <Theme>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <StrictMode>
          <SupabaseProvider>
            <WalletProvider>
              <XMTPProvider
                dbVersion={DB_VERSION}
                contentTypeConfigs={contentTypeConfigs}
              >
                <Navbar />
                <div className="">
                  <RequireWalletConnected>
                    <App />
                  </RequireWalletConnected>
                </div>
              </XMTPProvider>
            </WalletProvider>
          </SupabaseProvider>
        </StrictMode>
      </RainbowKitProvider>
    </WagmiConfig>
  </Theme>,
);
