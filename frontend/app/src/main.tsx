import "./polyfills";
import { StrictMode } from "react";
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
import ShowConnectDialogWhenNotConnected from "./components/ShowConnectDialogWhenNotConnected";
import "@xmtp/react-components/styles.css";
import { WalletProvider } from "./contexts/WalletContext";
import "./index.css";
import { ChangeNetworkButton } from "./components/ChangeNetworkButton";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Inbox } from "./components/Inbox";
import { Profile } from "./components/Profile";
import { SupabaseProvider } from "./components/SupabaseContext";
import { Search } from "./components/Search";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inbox />, //TODO this should probably be the "Message" and "NewMessage" components in the Inbox.tsx file
  },
  {
    path: "/profile/:address",
    element: <Profile />,
  },
  {
    path: "/search",
    element: <Search />,
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      <StrictMode>
        <SupabaseProvider>
          <WalletProvider>
            <XMTPProvider
              dbVersion={DB_VERSION}
              contentTypeConfigs={contentTypeConfigs}
            >
              <div className="container mx-auto">

                <ShowConnectDialogWhenNotConnected>
                  <ChangeNetworkButton />
                  <RouterProvider router={router} />
                </ShowConnectDialogWhenNotConnected>
              </div>
            </XMTPProvider>
          </WalletProvider>
        </SupabaseProvider>
      </StrictMode>
    </RainbowKitProvider>
  </WagmiConfig>,
);
