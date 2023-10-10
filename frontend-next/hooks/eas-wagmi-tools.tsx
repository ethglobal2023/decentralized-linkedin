//This was taken entirely from: https://gist.github.com/slavik0329/2e5b6fc31cb745b65d3d37f7cf1d7b36
// These are wrappers around wagmi that lets you pass the walletClient to the EAS sdk
import { type PublicClient, type WalletClient } from "@wagmi/core";
import { providers } from "ethers";
import { type HttpTransport } from "viem";
import { useEffect, useState } from "react";
import type { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { usePublicClient, useWalletClient } from "wagmi";


export function publicClientToProvider(publicClient: PublicClient) {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address
  };
  if (transport.type === "fallback")
    return new providers.FallbackProvider(
      (transport.transports as ReturnType<HttpTransport>[]).map(
        ({ value }) => new providers.JsonRpcProvider(value?.url, network)
      )
    );
  return new providers.JsonRpcProvider(transport.url, network);
}

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  console.log(
    "walletClientToSigner",
    account,
    chain,
    transport,
  )
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
console.log('signer', signer)
  return signer;
}


export function useSigner() {
  const { data: walletClient } = useWalletClient();

  console.log('walletClient', walletClient)
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

  const [provider, setProvider] = useState<JsonRpcProvider | undefined>(undefined);
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
