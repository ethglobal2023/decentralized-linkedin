import { FC, PropsWithChildren, useEffect } from "react";
import { useClient } from "@xmtp/react-sdk";
import { useWallet } from "../hooks/useWallet";
import { WalletConnect } from "./WalletConnect";
import { XMTPConnect } from "./XMTPConnect";

export const RequireWalletConnected: FC<PropsWithChildren> = ({ children }) => {
  const { address, isConnected, chain } = useWallet();

  if (!isConnected || !chain) {
    return <WalletConnect />;
  }
  return children;
};
