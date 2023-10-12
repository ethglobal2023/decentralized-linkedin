import { FC, PropsWithChildren, useEffect } from "react";
import { useClient } from "@xmtp/react-sdk";
import { useWallet } from "../hooks/useWallet";
import { WalletConnect } from "./WalletConnect";
import { XMTPConnect } from "./XMTPConnect";

const ShowConnectDialogWhenNotConnected: FC<PropsWithChildren> = ({
  children,
}) => {
  const { address, isConnected, chain } = useWallet();
  const { client, disconnect } = useClient();

  // disconnect XMTP client when the wallet changes
  useEffect(() => {
    void disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  if (!isConnected || !chain) {
    return <WalletConnect />;
  }
  if (!client) {
    return <XMTPConnect />;
  }
  return children;
};

export default ShowConnectDialogWhenNotConnected;
