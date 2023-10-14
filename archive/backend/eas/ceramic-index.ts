import { config } from "../../../backend/src/config";
import { definition } from "../../../backend/src/__generated__/definition";

export const ceramicClient = new CeramicClient(config.ceramicUrl);

// TODO clean this up, we shouldn't have to initialize it on every run
export const getComposeClient = async () => {
  const composeClient: ComposeClient = new ComposeClient({
    ceramic: config.ceramicUrl,
    definition: definition as RuntimeCompositeDefinition,
  });
  const did = await authenticateIssuerDID(config.ceramicKey);
  composeClient.setDID(did);
  return composeClient;
};