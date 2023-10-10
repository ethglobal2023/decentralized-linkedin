import { createContext } from "react";

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
  metIrlSchema: string;
  confirmSchema: string;
};

//TODO This is sloppy, fix it when we port to NextJS
export const BACKEND_URL = "http://localhost:3005";

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
    metIrlSchema: "",
    confirmSchema: "",
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
    metIrlSchema:
      "0xc59265615401143689cbfe73046a922c975c99d97e4c248070435b1104b2dea7",
    confirmSchema:
      "0xb96446c85ce538c1641a967f23ea11bbb4a390ef745fc5a9905689dbd48bac86",
  },
};

export const EASConfigContext = createContext<EASChainConfig>(
  EAS_CHAIN_CONFIGS[0],
);
// React context provider that carries the EAS chain config
export const EasConfigContextProvider = ({
  chainId,
  children,
}: {
  chainId: number;
  children: any;
}) => {
  const config = EAS_CHAIN_CONFIGS[chainId];

  if (!config) {
    return <div>Could not find an EAS config for chainid {chainId}</div>;
  }
  return (
    <EASConfigContext.Provider value={config}>
      {children}
    </EASConfigContext.Provider>
  );
};
