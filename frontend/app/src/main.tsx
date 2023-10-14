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
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Inbox } from "./components/Inbox";
import { SupabaseProvider } from "./contexts/SupabaseContext";
import { Search } from "./components/Search";
import { EasConfigContextProvider } from "./components/admin/EASConfigContext";
import { ProfileMediaCard } from "./components/ProfileMediaCard";
import { AdminManualVerificationInbox } from "./components/admin/AdminManualVerificationInbox";
import ProfileCard from "./components/ProfileCard";
import { ProfilePublish } from "./components/ProfilePublish";
import Navbar from "./components/Navbar";
import { AdminHome } from "./components/admin/AdminHome";

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
    path: "/search",
    element: <Search />,
  },
  {
    path: "/admin",
    element: (
      <EasConfigContextProvider>
        <AdminHome />
        <ProfileMediaCard cid={"cid:testcid4"} mediaType={"publication"} />
        <ProfileMediaCard
          cid={`cid:testcid${Date.now()}`}
          mediaType={"publication"}
        />
      </EasConfigContextProvider>
    ),
  },
  {
    path: "/admin/inbox", //This admin inbox is for manual verification of attestations
    element: (
      <EasConfigContextProvider>
        <AdminManualVerificationInbox />
      </EasConfigContextProvider>
    ),
  },
  {
    path: "/inbox",
    element: <Inbox />,
  },
  {
    path: "/profile/:address",
    element: <ProfileCard />,
  },
  {
    path: "/publish",
    element: <ProfilePublish />,
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
              <Navbar />
              <div className="container mx-auto">
                <ShowConnectDialogWhenNotConnected>
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
