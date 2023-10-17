import { LinkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useClient } from "@xmtp/react-sdk";
import { useCallback } from "react";
import { useWalletClient } from "wagmi";
import { Notification } from "./Notification";

type XMTPConnectButtonProps = {
  label: string;
};

const XMTPConnectButton: React.FC<XMTPConnectButtonProps> = ({ label }) => {
  const { initialize } = useClient();
  const { data: walletClient } = useWalletClient();

  const handleConnect = useCallback(() => {
    void initialize({
      signer: walletClient,
    });
  }, [initialize, walletClient]);

  return (
    <button  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg flex dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 " type="button" onClick={handleConnect}>
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
        cta={<XMTPConnectButton label="Try again" />}>
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
      cta={<XMTPConnectButton label="Connect" />}>
      Connect to XMTP to continue
    </Notification>
  );
};
