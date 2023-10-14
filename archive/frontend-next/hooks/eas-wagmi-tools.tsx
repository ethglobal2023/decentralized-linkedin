//This was taken entirely from: https://gist.github.com/slavik0329/2e5b6fc31cb745b65d3d37f7cf1d7b36
// These are wrappers around wagmi that lets you pass the walletClient to the EAS sdk
import { useEffect, useState } from "react";
import {
  PublicClient,
  usePublicClient,
  useWalletClient,
  WalletClient,
} from "wagmi";
import { HttpTransport } from "viem";
import { BrowserProvider, FallbackProvider, JsonRpcProvider, JsonRpcSigner } from "ethers";

export function publicClientToProvider(publicClient: PublicClient) {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === "fallback")
    return new FallbackProvider(
      (transport.transports as ReturnType<HttpTransport>[]).map(
        ({ value }) => new JsonRpcProvider(value?.url, network),
      ),
    );
  return new JsonRpcProvider(transport.url, network);
}

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  console.log("walletClientToSigner", account, chain, transport);
  console.log("signer props incoming");
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  console.log("provider", provider);
  const signer = provider.getSigner(account.address);
  console.log("signer", signer);
  return signer;
}

export function useSigner() {
  const { data: walletClient } = useWalletClient();

  // console.log('walletClient', walletClient)
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);
  useEffect(() => {
    async function getSigner() {
      if (!walletClient) return;

      const tmpSigner = walletClientToSigner(walletClient);

      setSigner(tmpSigner);
    }

    getSigner();
  }, [walletClient]);
  return signer;
}

export function useProvider() {
  const publicClient = usePublicClient();

  const [provider, setProvider] = useState<JsonRpcProvider | undefined>(
    undefined,
  );
  useEffect(() => {
    async function getSigner() {
      if (!publicClient) return;

      const tmpProvider = publicClientToProvider(publicClient);

      setProvider(tmpProvider as JsonRpcProvider);
    }

    getSigner();
  }, [publicClient]);
  return provider;
}
