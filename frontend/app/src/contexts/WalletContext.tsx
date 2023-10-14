import "@rainbow-me/rainbowkit/styles.css";
import { createContext, useMemo } from "react";
import { Chain, useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";

export type WalletContextValue = {
  address: `0x${string}` | undefined;
  disconnect: ReturnType<typeof useDisconnect>["disconnect"];
  error: Error | null;
  isConnected: boolean;
  isLoading: boolean;
  chain: Chain | undefined;
  chainsSupportedByWallet: Chain[];
};

export const WalletContext = createContext<WalletContextValue>({
  address: undefined,
  disconnect: () => {},
  error: null,
  isConnected: false,
  isLoading: false,
  chain: undefined,
  chainsSupportedByWallet: [],
});

export const WalletProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { address, isConnected, isConnecting, isReconnecting, connector } = useAccount();
  const { error } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain, chains: chainsSupportedByWallet } = useNetwork()

  const isLoading = isConnecting || isReconnecting;

  // memo-ize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      address,
      disconnect,
      error,
      isLoading,
      isConnected,
      chain,
      chainsSupportedByWallet
    }),
    [address, disconnect, error, isLoading, isConnected, chain, chainsSupportedByWallet],
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
