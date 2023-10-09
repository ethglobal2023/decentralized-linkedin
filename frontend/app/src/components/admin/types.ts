import { TypedData } from "@ethereum-attestation-service/eas-sdk/dist/offchain/typed-data-handler"
import { EAS } from "@ethereum-attestation-service/eas-sdk";

export type EASChainConfig = {
  chainId: number
  chainName: string
  version: string
  contractAddress: string
  eas: EAS,
  schemaRegistryAddress: string
  etherscanURL: string
  easscanUrl: string
  /** Must contain a trailing dot (unless mainnet). */
  subdomain: string
  contractStartBlock: number
  rpcProvider: string
  metIrlSchema: string
  confirmSchema: string
}


export interface Attestation {
  id: string
  attester: string
  recipient: string
  refUID: string
  revocationTime: number
  expirationTime: number
  time: number
  txid: string
  data: string
}

export interface FullAttestation {
  id: string
  attester: string
  recipient: string
  refUID: string
  revocationTime?: number
  expirationTime?: number
  time: number
  txid: string
  data: string
  uid: string
  schema: string
  verifyingContract: string
  easVersion: string
  version: number
  chainId: number
  r: string
  s: string
  v: number
  types: TypedData[]
  currAccount: string;
  confirmation?: Attestation
}

export type ResolvedAttestation = Attestation & {
  name: string
  uid: string
  confirmation?: Attestation
  currAccount: string;
}
