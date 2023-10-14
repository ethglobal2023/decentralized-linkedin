import { TypedData } from "@ethereum-attestation-service/eas-sdk/dist/offchain/typed-data-handler";

export interface Attestation {
  id: string;
  attester: string;
  recipient: string;
  refUID: string;
  revocationTime: number;
  expirationTime: number;
  time: number;
  txid: string;
  data: string;
}

export interface FullAttestation {
  id: string;
  attester: string;
  recipient: string;
  refUID: string;
  revocationTime?: number;
  expirationTime?: number;
  time: number;
  txid: string;
  data: string;
  uid: string;
  schema: string;
  verifyingContract: string;
  easVersion: string;
  version: number;
  chainId: number;
  r: string;
  s: string;
  v: number;
  types: TypedData[];
  currAccount: string;
  confirmation?: Attestation;
}

export type ResolvedAttestation = Attestation & {
  name: string;
  uid: string;
  confirmation?: Attestation;
  currAccount: string;
};

export type MessageWithViemSignature<T> = {
  message: T & { account: string };
  signature: string;
};
