import { useWallet } from "../hooks/useWallet";
import { WalletConnect } from "./WalletConnect";
import { ReactNode } from "react";

export const DisplayWalletConnectIfNotConnected: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { isConnected, chain } = useWallet();
  // const { client } = useClient();

  if (!isConnected || !chain) {
    return <WalletConnect />;
  }
  //
  // if (!client) {
  //   return <XMTPConnect />;
  // }

  return children;
};
