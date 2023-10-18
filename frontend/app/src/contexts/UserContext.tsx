import { useContext, createContext, useMemo, useState } from "react";
import {
  Chain,
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
} from "wagmi";
import { createClient, http, publicActions } from "viem";
import { privateKeyToAccount, PrivateKeyAccount } from "viem/accounts";
import { mainnet } from "wagmi";

export type UserContextValue = {
  address: `0x${string}` | undefined;
  disconnect: ReturnType<typeof useDisconnect>["disconnect"];
  error: Error | null;
  isConnected: boolean;
  isLoading: boolean;
  chain: Chain | undefined;
  chainsSupportedByWallet: Chain[];
  walletClient: any;
  setLocalAccount: (val: string) => void;
};

export const UserContext = createContext<UserContextValue>({
  address: undefined,
  disconnect: () => {},
  error: null,
  isConnected: false,
  isLoading: false,
  chain: undefined,
  chainsSupportedByWallet: [],
  walletClient: null,
  setLocalAccount: () => {},
});

export const UserProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [localAccount, setLocalAccount] = useState("");
  const { address, isConnected, isConnecting, isReconnecting, connector } =
    useAccount();
  const { error } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain, chains: chainsSupportedByWallet } = useNetwork();

  const walletClient = createClient({
    chain: mainnet,
    transport: http(),
    account:
      localAccount === ""
        ? undefined
        : privateKeyToAccount(localAccount as `0x${string}`),
  }).extend(publicActions);

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
      chainsSupportedByWallet,
      walletClient,
      setLocalAccount,
    }),
    [
      address,
      disconnect,
      error,
      isLoading,
      isConnected,
      chain,
      chainsSupportedByWallet,
      localAccount,
      walletClient,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export const useUser = () => useContext(UserContext);
