import React, { useContext, useState } from "react";
import { useWallet } from "../../hooks/useWallet";
import JSONPretty from "react-json-pretty";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { BACKEND_URL, EASConfigContext } from "./EASConfigContext";
import { useAccount, useWalletClient } from "wagmi";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { BrowserProvider } from "ethers";
import { SchemaItem } from "@ethereum-attestation-service/eas-sdk/dist/schema-encoder";
import "./AdminCreateAttestation.css";

interface MediaAttestationForm {
  hidden: boolean;
  participant: string;
  keywordsProven: { keyword: string }[];
  refUrl: string;
  refType: string;
}

interface PublicInterviewForm {
  hidden: boolean;
  interviewee: string;
  videoUrl: string;
  positionTitle: string;
  keywords: string[];
}

//TODO port me to lib
type MakeAttestationReqVars = {
  schema: string;
  schemaId: string;
  attestationType: string;
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
    attestationType,
    easChainId,
    recipient,
    values,
    contractAddress,
    walletClient,
    connector,
    issuer,
  } = vars;
  console.log("makeAttestationRequest", vars);
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

  console.log("Encoding schema `", schema, "`");
  const schemaEncoder = new SchemaEncoder(schema);
  console.log("Encoding data", values);
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

  console.log("offchainAttestation", offchainAttestation);
  console.log(account);
  // @ts-ignore-next-line
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
  const requestBody = {
    ...offchainAttestation,
    account: account.address.toLowerCase(),
    attestationType,
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

  const { chainId: easChainId, contractAddress } = useContext(EASConfigContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<MediaAttestationForm>({
    defaultValues: {
      hidden: false,
      participant: "0x9cbC225B9d08502d231a6d8c8FF0Cc66aDcc2A4F",
      keywordsProven: [{ keyword: "react" }, { keyword: "typescript" }],
      refUrl: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
      refType: "video",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "keywordsProven",
  });

  const schema =
    "bool hidden,string[] keywordsProven,string refUrl,string refType";
  const schemaId =
    "0x05c2e1f0b48be70e62aa2f5b5ee334b6bab15722c7c859d8c22c4b6ca7166c14";
  if (!address) {
    return (
      <div>
        You must be connected w/ a browser wallet to create an attestation
      </div>
    );
  }

  const onSubmit: SubmitHandler<MediaAttestationForm> = async (data) => {
    setAttesting(true);
    try {
      const values = [
        { name: "hidden", type: "bool", value: data.hidden },
        {
          name: "keywordsProven",
          type: "string[]",
          value: data.keywordsProven.map((item) => item.keyword),
        },
        { name: "refUrl", type: "string", value: data.refUrl },
        { name: "refType", type: "string", value: data.refType },
      ];

      console.log("Making attestation request with values", values);

      const res = await makeAttestationRequest({
        schema,
        schemaId,
        attestationType: "proveSkills",
        easChainId,
        issuer: address,
        recipient: data.participant,
        values,
        contractAddress,
        walletClient,
        connector,
      });
      console.log("res", res);
      setJsonResponse(res);
    } catch (error: any) {
      console.log("error", error);
      setErrorMessage(error);
    }

    setAttesting(false);
  };

  return (
    <div className="border-2 border-gray-300 rounded p-8 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col m-2 space-y-4"
      >
        <div className="mb-4 flex justify-center">
          <p className="title">
            Create attestation that proves skills w/ media
          </p>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hidden"
            {...register("hidden", { required: true })}
            className="form-checkbox"
          />
          <label htmlFor="hidden" className="form-checkbox-label ml-2">
            Hidden
          </label>
        </div>
        <input
          {...(register("participant"), { required: true })}
          className="form-input"
          placeholder="Participant"
          defaultValue={"0x9cbC225B9d08502d231a6d8c8FF0Cc66aDcc2A4F"}
        />

        <ul className="space-y-4">
          {fields.map((item, index) => (
            <li key={item.id} className="flex items-center space-x-4">
              <Controller
                name={`keywordsProven.${index}.keyword`}
                control={control}
                defaultValue={item.keyword} // make sure to set up defaultValue
                render={({ field }) => (
                  <input
                    {...field}
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Keyword"
                  />
                )}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
              >
                Remove
              </button>
            </li>
          ))}
          <li>
            {/*TODO style is heresy*/}
            <button
              type="button"
              className={"submit-button ml-auto"}
              onClick={() => append({ keyword: "" })}
            >
              Add Keyword
            </button>
          </li>
        </ul>

        <div>
          <input
            {...(register("refUrl"), { required: true })}
            className="form-input"
            placeholder="Reference URL"
            defaultValue={"https://www.youtube.com/watch?v=oHg5SJYRHA0"}
          />
        </div>
        <div>
          <input
            {...(register("refType"), { required: true })}
            className="form-input"
            placeholder="Reference Type"
            defaultValue={"video"}
          />
        </div>
        <div>
          <input type="submit" value="Submit" className="submit-button" />
        </div>
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
    "bool hidden,string videoUrl,string positionTitle,string[] keywords";
  const schemaId =
    "0x378de8339306aba178801652f305e6d8c92237819a761eae3d432bd96ce3c8f4"; // Update if necessary

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
        { name: "hidden", type: "bool", value: data.hidden },
        { name: "videoUrl", type: "string", value: data.videoUrl },
        { name: "positionTitle", type: "string", value: data.positionTitle },
        { name: "keywords", type: "string[]", value: data.keywords },
      ];

      const res = await makeAttestationRequest({
        schema,
        schemaId,
        attestationType: "publicInterview",
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
    <div className="border-2 border-gray-300 rounded p-8 ">
      <form onSubmit={handleSubmit(onSubmit)} className="flex-col m-2">
        <div className="mb-4 flex justify-center">
          <p className="title">Create attestation with public interview</p>
        </div>

        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="hidden"
            {...register("hidden", { required: true })}
            className="form-checkbox"
          />
          <label htmlFor="hidden" className="form-checkbox-label ml-2">
            Hidden
          </label>
        </div>
        <input
          {...(register("interviewee"), { required: true })}
          className="form-input"
          placeholder="Interviewee"
        />
        <input
          {...(register("videoUrl"), { required: true })}
          className="form-input"
          placeholder="Video URL"
        />
        <input
          {...(register("positionTitle"), { required: true })}
          className="form-input"
          placeholder="Position Title"
        />
        <input
          {...(register("keywords"), { required: true })}
          className="form-input"
          placeholder="Keywords (comma separated)"
        />
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
        <JSONPretty id="json-pretty" data={jsonResponse || errorMessage} />
      </div>
    </div>
  );
};
