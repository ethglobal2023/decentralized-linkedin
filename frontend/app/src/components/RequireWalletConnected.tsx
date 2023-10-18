import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useClient } from "@xmtp/react-sdk";
import { useWallet } from "../hooks/useWallet";
import { WalletConnect } from "./WalletConnect";
import { XMTPConnect } from "./XMTPConnect";
import { Notification } from "./Notification";
import { LinkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { Wallet } from "ethers";
import { createWalletClient, custom, http } from "viem";
import { mainnet } from "viem/chains";
import LoginWithEmail from "./LoginWithEmail";

export const RequireWalletConnected: FC<PropsWithChildren> = ({ children }) => {
  const { address, isConnected, chain, walletClient, isSignedIn } = useWallet();
  console.log("child", children);

  console.log(
    "🚀 ~ file: RequireWalletConnected.tsx:16 ~ isConnected:",
    isConnected,
    typeof walletClient?.account
  );

  console.log(
    "is tr",
    !isConnected || typeof walletClient?.account === "undefined"
  );

  // const client = createWalletClient({
  //   account: walletAddress as `0x${string}`,
  //   chain: mainnet,
  //   transport: http(),
  // });

  if (!isConnected && !isSignedIn) {
    return (
      <div className=" flex w-screen h-[80vh] justify-center items-center ">
        <h1 className="text-xl">Please connect a wallet to use the app</h1>
      </div>
    );
  } else {
    return children;
  }
};
