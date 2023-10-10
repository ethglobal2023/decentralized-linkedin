import "./App.css";
import { useClient } from "@xmtp/react-sdk";
import { useWallet } from "../hooks/useWallet";
import { XMTPConnect } from "./XMTPConnect";
import { WalletConnect } from "./WalletConnect";
import { EasConfigContextProvider } from "./admin/EASConfigContext";
import AdminCreateAttestation from "./admin/CreateMetIrlAttestation";
import { Inbox } from "./Inbox";

export const ContentRouter = () => {
  const { isConnected, chain } = useWallet();
  const { client } = useClient();

  if (!isConnected || !chain) {
    return <WalletConnect />;
  }
  //
  if (!client) {
    return <XMTPConnect />;
  }


  return (
      <Inbox/>
  );
  // return (
  //   <EasConfigContextProvider chainId={chain.id}>
  //     <AdminCreateAttestation />
  //   </EasConfigContextProvider>
  // );
};
