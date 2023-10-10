import "./globals.css";
import { Inter } from "next/font/google";
import React, { StrictMode } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import "@xmtp/react-components/styles.css";
import "./index.css";
import "./page.css";
import { WagmiProvider } from "@/contexts/WagmiProviderWrapper";
import { EasConfigContextProvider } from "@/contexts/EASConfigContext";
import { WalletProvider } from "@/contexts/WalletContext";
import { DisplayWalletConnectIfNotConnected } from "@/components/DisplayWalletConnectIfNotConnected";
import { ChangeNetworkButton } from "@/components/ChangeNetworkButton";
// import "./polyfills"
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { address } = useWallet();
  // const { disconnect } = useClient();
  // // disconnect XMTP client when the wallet changes
  // useEffect(() => {
  //   void disconnect();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [address]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="App">
          <StrictMode>
            <WagmiProvider>
              <WalletProvider>
                <DisplayWalletConnectIfNotConnected>
                {/*  <ChangeNetworkButton />*/}
                {/*  <EasConfigContextProvider>*/}
                {/*    {children}*/}
                {/*  </EasConfigContextProvider>*/}
                </DisplayWalletConnectIfNotConnected>
              </WalletProvider>
            </WagmiProvider>
          </StrictMode>
        </div>
      </body>
    </html>
  );
}
