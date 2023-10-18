import { LinkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Client, useClient } from "@xmtp/react-sdk";
import { useEffect } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { Notification } from "./Notification";
import { useWallet } from "../hooks/useWallet";

const ENCODING = "binary";

export const getEnv = (): "dev" | "production" | "local" => {
  return "production";
};

export const buildLocalStorageKey = (walletAddress: string) =>
  walletAddress ? `xmtp:${getEnv()}:keys:${walletAddress}` : "";

export const loadKeys = (walletAddress: string): Uint8Array | null => {
  const val = localStorage.getItem(buildLocalStorageKey(walletAddress));
  return val ? Buffer.from(val, ENCODING) : null;
};

export const storeKeys = (walletAddress: string, keys: Uint8Array) => {
  localStorage.setItem(
    buildLocalStorageKey(walletAddress),
    Buffer.from(keys).toString(ENCODING)
  );
};

type XMTPConnectButtonProps = {
  label: string;
};

const XMTPConnectButton: React.FC<XMTPConnectButtonProps> = ({ label }) => {
  const { initialize, client } = useClient();
  const { address } = useAccount();
  const { isSignedIn, walletClient: localWallet } = useWallet();
  const { data: walletClient } = useWalletClient();
  console.log("🚀 ~ file: XMTPConnect.tsx:38 ~ walletClient:", walletClient);
  console.log("🚀 ~ file: XMTPConnect.tsx:39 ~ localwallet:", localWallet);

  const handleConnect = async () => {
    if (isSignedIn) {
      let keys = loadKeys(localWallet.account.address!);
      if (!keys) {
        keys = await Client.getKeys(localWallet, {});

        storeKeys(localWallet.account.address!, keys!);
        await initialize({ signer: localWallet });
      } else {
        let keys = loadKeys(address!);
        console.log(
          "🚀 ~ file: XMTPConnect.tsx:51 ~ handleConnect ~ keys:",
          keys
        );
        if (!keys) {
          keys = await Client.getKeys(walletClient!);
          console.log(
            "🚀 ~ file: XMTPConnect.tsx:53 ~ handleConnect ~ keys:",
            keys
          );
          storeKeys(address!, keys!);
        }
        await initialize({ keys, signer: walletClient });
      }
    }
  };

  useEffect(() => {
    if (address || isSignedIn) {
      void handleConnect();
    }
  }, []);

  return (
    <button className="Button" type="button" onClick={handleConnect}>
      {label}
    </button>
  );
};

export const XMTPConnect: React.FC = () => {
  const { isLoading, error } = useClient();

  if (error) {
    return (
      <Notification
        icon={<ExclamationTriangleIcon />}
        title="Could not connect to XMTP"
        cta={<XMTPConnectButton label="Try again" />}
      >
        Something went wrong
      </Notification>
    );
  }

  if (isLoading) {
    return (
      <Notification icon={<LinkIcon />} title="Connecting to XMTP">
        Awaiting signatures...
      </Notification>
    );
  }

  return (
    <Notification
      icon={<LinkIcon />}
      title="XMTP not connected"
      cta={<XMTPConnectButton label="Connect" />}
    >
      Connect to XMTP to continue
    </Notification>
  );
};
