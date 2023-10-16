import { FC, PropsWithChildren, useEffect } from "react";
import { useClient } from "@xmtp/react-sdk";
import { useWallet } from "../hooks/useWallet";
import { XMTPConnect } from "./XMTPConnect";


export const RequireXMTPConnected: FC<PropsWithChildren> = ({ children }) => {
  const { client, disconnect } = useClient();

  const { address, isConnected, chain } = useWallet();

  // disconnect XMTP client when the wallet changes
  useEffect(() => {
    void disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  if (!client) {
    return <XMTPConnect />;
  }
  return children;
};
