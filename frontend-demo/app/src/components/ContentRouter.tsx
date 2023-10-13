import "./App.css";
import { useClient } from "@xmtp/react-sdk";
import { useWallet } from "../hooks/useWallet";
import { XMTPConnect } from "./XMTPConnect";
import { WalletConnect } from "./WalletConnect";
import { Inbox } from "./Inbox";
import ProfileCard from "./ProfileCard";
import SideBar from "./SideBar";

export const ContentRouter = () => {
  const { isConnected } = useWallet();
  const { client } = useClient();

  if (!isConnected) {
    return <WalletConnect />;
  }

  if (!client) {
    return <XMTPConnect />;
  }

  return <ProfileCard/>;
};
