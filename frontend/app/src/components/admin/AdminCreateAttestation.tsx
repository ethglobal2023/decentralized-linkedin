import React, { ReactNode, useContext, useState } from "react";
import { useWallet } from "../../hooks/useWallet";
import JSONPretty from "react-json-pretty";
import { SubmitHandler, useForm } from "react-hook-form";
import { BACKEND_URL, EASConfigContext } from "./EASConfigContext";
import { useAccount, useWalletClient } from "wagmi";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { BrowserProvider } from "ethers";
import { SchemaItem } from "@ethereum-attestation-service/eas-sdk/dist/schema-encoder";
import "./AdminCreateAttestation.css"


interface MediaAttestationForm {
  public: boolean;
  participant: string;
  keywordsProven: string[];
  refUrl: string;
  refType: string;
}

interface PublicInterviewForm {
  public: boolean;
  interviewee: string;
  videoUrl: string;
  positionTitle: string;
  keywords: string[];
}

//TODO port me to lib
type MakeAttestationReqVars = {
  schema: string;
  schemaId: string;
  easChainId: number;
  issuer: string;
  recipient: string;
  values: SchemaItem[];
  contractAddress: string;
  walletClient: any;
  connector: any;
};

const makeAttestationRequest = async (vars: MakeAttestationReqVars) => {
  const {
    schema,
    schemaId,
    easChainId,
    recipient,
    values,
    contractAddress,
    walletClient,
    connector,
    issuer,
  } = vars;
  // Check if 'values' is empty
  if (!values || values.length === 0) {
    throw new Error("'values' cannot be empty");
  }

  // Check if 'recipient' is empty
  if (!recipient) {
    throw new Error("'recipient' cannot be empty");
  }

  // Check if 'contractAddress' is empty
  if (!contractAddress) {
    throw new Error("'contractAddress' cannot be empty");
  }

  // Check if 'easChainId' is 0
  if (easChainId === 0) {
    throw new Error("'easChainId' cannot be 0");
  }

  // Check if 'walletClient' is undefined
  if (!walletClient) {
    throw new Error("'walletClient' cannot be undefined");
  }

  // Check if 'connector' is undefined
  if (!connector) {
    throw new Error("'connector' cannot be undefined");
  }
  if (!issuer || issuer.length === 0) {
    return (
      <div>
        You must be connected w/ a browser wallet to create an attestation
      </div>
    );
  }
  if (easChainId === 0) {
    return <div>Could not find EAS config for the current chain</div>;
  }

  if (!walletClient || !connector) {
    return <div>Wallet client or connector is not connected</div>;
  }
  const eas = new EAS(contractAddress);

  const { account, chain, transport } = walletClient;
  console.log("walletClientToSignerFORM", walletClient);
  if (chain.id !== easChainId) {
    throw new Error(
      `The chain is ${easChainId} according to context, but the walletClient is connected to ${chain.id}`,
    );
  }
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };

  const provider = new BrowserProvider(transport, network);
  const signer = await provider.getSigner(account.address);
  if (!signer) {
    return;
  }
  eas.connect(signer);
  const offchain = await eas.getOffchain();

  console.log("Encoding schema");
  const schemaEncoder = new SchemaEncoder(schema);
  const encoded = schemaEncoder.encodeData(values);
  const time = Math.floor(Date.now() / 1000);

  console.log("Signing attestation");
  const offchainAttestation = await offchain.signOffchainAttestation(
    {
      recipient,
      // Unix timestamp of when attestation expires. (0 for no expiration)
      expirationTime: 0n,
      // Unix timestamp of current time
      time: BigInt(time), //TODO, validate this on the backend
      revocable: true,
      version: 1,
      nonce: 0n, //TODO, validate this on the backend
      schema: schemaId,
      //This field is for when you're referencing another attestation. For us, it's unset because this attestation is new.
      refUID:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      data: encoded,
    },
    signer,
  );
  // un-comment the below to process an on-chain timestamp
  // console.log("Adding an on-chain timestamp")
  // const transaction = await eas.timestamp(offchainAttestation.uid);
  // // Optional: Wait for the transaction to be validated
  // await transaction.wait();
  // ts ignore nextline because Bigint doesn't have toJSON as a function

  // @ts-ignore-next-line
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
  const requestBody = {
    ...offchainAttestation,
    account: account.toLowerCase(),
    attestationType: "met_irl",
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };
  // call attest api endpoint to store attestation on ComposeDB
  const res = await fetch(`${BACKEND_URL}/eas/attest`, requestOptions).then(
    (response) => response.json(),
  );

  return res;
};

export const CreateAttestMediaForm: React.FC = ({}) => {
  const { address } = useWallet();
  const { connector } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [attesting, setAttesting] = useState(false);
  const [jsonResponse, setJsonResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const schema =
    "bool public,string participant,string[] keywordsProven,string refUrl,string refType";
  const schemaId =
    "0x3bd56e81d71d4552327d80c7adc5ab73afcd3d6bdd02668c82f8d65141b6e7c0";
  const { chainId: easChainId, contractAddress } = useContext(EASConfigContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MediaAttestationForm>();

  if (!address) {
    return (
      <div>
        You must be connected w/ a browser wallet to create an attestation
      </div>
    );
  }
  const onSubmit: SubmitHandler<MediaAttestationForm> = async (data) => {
    const {} = useContext(EASConfigContext);
    setAttesting(true);
    try {
      const values = [
        { name: "public", type: "bool", value: data.public },
        { name: "participant", type: "string", value: data.participant },
        {
          name: "keywordsProven",
          type: "string[]",
          value: data.keywordsProven,
        },
        { name: "refUrl", type: "string", value: data.refUrl },
        { name: "refType", type: "string", value: data.refType },
      ];

      const res = await makeAttestationRequest({
        schema,
        schemaId,
        easChainId,
        issuer: address,
        recipient: data.participant,
        values,
        contractAddress,
        walletClient,
        connector,
      });
      setJsonResponse(res);
    } catch (error: any) {
      setErrorMessage(error);
    }
    setAttesting(false);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)} className={"flex-col border-2"}>
        <div className="Title flex justify-center">
          <p className={"text-xl"}>
            Create attestation that proves skills w/ media
          </p>
        </div>
        <input {...(register("public"), { required: true })} />
        <input {...(register("participant"), { required: true })} />
        <input {...(register("keywordsProven"), { required: true })} />
        <input {...(register("refUrl"), { required: true })} />
        <input {...(register("refType"), { required: true })} />
        <input type={"submit"} value={"Submit"} className={"btn"} />
        {/* errors will return when field validation fails  */}
      </form>
      {attesting
        ? "Attesting..."
        : "Waiting for form submission to create attestation"}

      <div>
        <h2>Response</h2>
        {errorMessage && <div className="Error">{errorMessage}</div>}
        <JSONPretty id="json-pretty" data={jsonResponse} />
      </div>
    </FormContainer>
  );
};

export const CreateAttestPublicInterview: React.FC = ({}) => {
  const { address } = useWallet();
  const { connector } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [attesting, setAttesting] = useState(false);
  const [jsonResponse, setJsonResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { chainId: easChainId, contractAddress } = useContext(EASConfigContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PublicInterviewForm>();

  const schema =
    "bool public,string interviewee,string videoUrl,string positionTitle,string[] keywords";
  const schemaId =
    "0x3cbc700e482fc1444abb73c329a02d52fd12adaca8d16eabf1343ffa9f3fd6a0"; // Update if necessary

  if (!address) {
    return (
      <div>
        You must be connected w/ a browser wallet to create an attestation
      </div>
    );
  }
  const onSubmit: SubmitHandler<PublicInterviewForm> = async (data) => {
    const {} = useContext(EASConfigContext);
    setAttesting(true);
    try {
      const values = [
        { name: "public", type: "bool", value: data.public },
        { name: "interviewee", type: "string", value: data.interviewee },
        { name: "videoUrl", type: "string", value: data.videoUrl },
        { name: "positionTitle", type: "string", value: data.positionTitle },
        { name: "keywords", type: "string[]", value: data.keywords },
      ];

      const res = await makeAttestationRequest({
        schema,
        schemaId,
        easChainId,
        issuer: address,
        recipient: data.interviewee,
        values,
        contractAddress,
        walletClient,
        connector,
      });
      setJsonResponse(res);
    } catch (error: any) {
      setErrorMessage(error);
    }
    setAttesting(false);
  };

  return (
    <div className="bg-white p-8 rounded shadow-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border-2 p-4 rounded"
      >
        <div className="mb-4 flex justify-center">
          <p className="title">
            Create attestation with media interview
          </p>
        </div>
        <input {...(register("public"), { required: true })} className="form-input" placeholder="Public" />
        <input {...(register("interviewee"), { required: true })} className="form-input" placeholder="Interviewee" />
        <input {...(register("videoUrl"), { required: true })} className="form-input" placeholder="Video URL" />
        <input {...(register("positionTitle"), { required: true })} className="form-input" placeholder="Position Title" />
        <input {...(register("keywords"), { required: true })} className="form-input" placeholder="Keywords (comma separated)" />
        <input type="submit" value="Submit" className="submit-button" />
        {/* errors will return when field validation fails  */}
      </form>
      <div className="mt-4">
        {attesting
          ? "Attesting..."
          : "Waiting for form submission to create attestation"}
      </div>

      <div className="mt-4">
        <h2 className="response-title">Response</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <JSONPretty id="json-pretty" data={jsonResponse} />
      </div>
    </div>
  );
};

const FormContainer: React.FC<{
  children: any;
}> = ({ children }) => {
  return (
    <div className="Container">
      <div className="WhiteBox">{children}</div>
    </div>
  );
};
