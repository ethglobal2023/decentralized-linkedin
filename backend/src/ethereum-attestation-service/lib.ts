import {Ed25519Provider} from "key-did-provider-ed25519";
import {fromString} from "uint8arrays/from-string";
import {DID} from "dids";
import {ceramicClient} from "./index.js";
import KeyResolver from "key-did-resolver";

// import {AccountId} from "caip";

//authenticate developer DID in order to create a write transaction
export const authenticateIssuerDID = async (seed: string) => {
    const key = fromString(seed, "base16");
    const provider = new Ed25519Provider(key);
    fromString(seed, "base16");
    const staticDid = new DID({
        resolver: KeyResolver.getResolver(),
        provider
    });
    await staticDid.authenticate();
    ceramicClient.did = staticDid;

    return staticDid;
}

// See here for all networks options: https://github.com/w3c-ccg/did-pkh/blob/main/did-pkh-method-draft.md#networks
type PkhSupportedNetwork = "eip155" | "tezos" | "solana" | "bip122"

// The below replicates the output of @didtools/pkh-ethereum's getAccountId function, just without requiring a provider
// This is easier to use in the REST API since the REST API is currently chain agnostic
// export const generatePkhDid = (address: string, network: PkhSupportedNetwork = "eip155", chainId = "") => {
//     const networkAndChainId = chainId ? `${network}:${chainId}` : `${network}`
//     return new AccountId({
//         address,
//         chainId: networkAndChainId
//     })
// }

