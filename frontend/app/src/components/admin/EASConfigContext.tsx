import { createContext } from "react";
import { useWallet } from "../../hooks/useWallet";

export type EASChainConfig = {
  chainId: number;
  chainName: string;
  version: string;
  contractAddress: string;
  schemaRegistryAddress: string;
  etherscanURL: string;
  easscanUrl: string;
  /** Must contain a trailing dot (unless mainnet). */
  subdomain: string;
  contractStartBlock: number;
  rpcProvider: string;
};

//TODO This is sloppy, fix it when we port to NextJS
export const BACKEND_URL = import.meta.env.VITE_API_BASE_URL as string;

export const EAS_CHAIN_CONFIGS: { [chainId: number]: EASChainConfig } = {
  0: {
    //Empty config for typescript
    chainId: 0,
    chainName: "",
    subdomain: "",
    version: "",
    contractAddress: "",
    schemaRegistryAddress: "",
    etherscanURL: "",
    contractStartBlock: 0,
    rpcProvider: "",
    easscanUrl: "",
  },
  11155111: {
    chainId: 11155111,
    chainName: "sepolia",
    subdomain: "sepolia.",
    version: "0.26",
    contractAddress: "0xC2679fBD37d54388Ce493F1DB75320D236e1815e",
    schemaRegistryAddress: "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0",
    etherscanURL: "https://sepolia.etherscan.io",
    contractStartBlock: 2958570,
    rpcProvider: `https://sepolia.infura.io/v3/`,
    easscanUrl: "https://sepolia.easscan.org",
  },
};

export const EASConfigContext = createContext<EASChainConfig>(
  EAS_CHAIN_CONFIGS[0],
);
// React context provider that carries the EAS chain config
export const EasConfigContextProvider = ({ children }: { children: any }) => {
  const { chain } = useWallet();
  const chainId = chain?.id || 0;
  const config = EAS_CHAIN_CONFIGS[chain?.id || 0];

  if (!config) {
    return <div>Could not find an EAS config for chainid {chainId}</div>;
  }

  return (
    <EASConfigContext.Provider value={config}>
      {children}
    </EASConfigContext.Provider>
  );
};
