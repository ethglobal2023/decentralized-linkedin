"use client";
import React, { useContext, useState } from "react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useWallet } from "@/hooks/useWallet";
import JSONPretty from "react-json-pretty";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BACKEND_URL,
  EASConfigContext,
  EasConfigContextProvider,
} from "@/contexts/EASConfigContext";
import { useSigner } from "@/hooks/eas-wagmi-tools";
import { WagmiProvider } from "@/contexts/WagmiProviderWrapper";

type SupportedAttestationTypes = "metIRL" | "resume";
type FormInputs = {
  recipientAddress: string;
};
export default function AdminCreateAttestation() {
  const { address, chain } = useWallet();
  const signer = useSigner();

  const [attesting, setAttesting] = useState(false);
  const [jsonResponse, setJsonResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const {
    chainId: easChainId,
    contractAddress,
    metIrlSchema,
  } = useContext(EASConfigContext);

  if (!address || address.length === 0) {
    return (
      <div>
        You must be connected w/ a browser wallet to create an attestation
      </div>
    );
  }
  if (chain?.id === 0) {
    return <div>Could not find EAS config for the current chain</div>;
  }
  if (!signer) {
    return <div>Could not find signer</div>;
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setAttesting(true);
    try {
      const eas = new EAS(contractAddress);
      console.log("Connecting to EAS");
      eas.connect(signer);

      console.log("Getting offchain");
      console.log(await eas.getChainId());
      console.log("Version");
      console.log(await eas.getVersion());
      console.log("Contract address");
      const offchain = await eas.getOffchain();

      console.log("Encoding schema");
      // TODO, I feel like we could download the schema from the chain
      // TODO Also, we could use an EAS registry that the user isn't signed into here. We'd only need to read the schema
      const schemaEncoder = new SchemaEncoder("bool metIRL");
      const encoded = schemaEncoder.encodeData([
        { name: "metIRL", type: "bool", value: true },
      ]);

      const time = Math.floor(Date.now() / 1000);

      console.log("Signing attestation");
      const offchainAttestation = await offchain.signOffchainAttestation(
        {
          recipient: data.recipientAddress.toLowerCase(),
          // Unix timestamp of when attestation expires. (0 for no expiration)
          expirationTime: 0,
          // Unix timestamp of current time
          time,
          revocable: true,
          version: 1,
          nonce: 0,
          schema: metIrlSchema,
          //This field is for when you're referencing another attestation. For us, it's unset because this attestation is new.
          refUID:
            "0x0000000000000000000000000000000000000000000000000000000000000000",
          data: encoded,
        },
        signer,
      );
      // un-comment the below to process an on-chain timestamp
      // const transaction = await eas.timestamp(offchainAttestation.uid);
      // // Optional: Wait for the transaction to be validated
      // await transaction.wait();
      // const userAddress = await signer.getAddress();
      // console.log("userAddress", userAddress);
      console.log(signer);
      const requestBody = {
        ...offchainAttestation,
        account: address.toLowerCase(),
        attestationType: "metIrl",
      };
      console.log(address);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };
      // call attest api endpoint to store attestation on ComposeDB
      const res = await fetch(`${BACKEND_URL}/eas/attest`, requestOptions).then(
        (response) => response.json(),
      );
      console.log("Attested", res);
      setAttesting(false);
    } catch (e) {
      console.log("Failed to attest", e);
    }
    setAttesting(false);
  };

  return (
        <div className="Container">
          <div className="GradientBar" />
          <div className="WhiteBox">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="Title">
                I <b>attest</b> that I met
              </div>

              <input {...register("recipientAddress", { required: true })} />
              {/* errors will return when field validation fails  */}
              {errors.recipientAddress && <span>This field is required</span>}
              <button
                type={"submit"}
                style={{ border: "1px solid black", padding: "5px" }}
              >
                submit
              </button>
            </form>
            {attesting
              ? "Attesting..."
              : "Waiting for form submission to create attestation"}

            <div>
              <h2>Response</h2>
              {errorMessage && <div className="Error">{errorMessage}</div>}
              <JSONPretty id="json-pretty" data={jsonResponse}></JSONPretty>
            </div>

            <div>
              <h2>Attestations you've issued</h2>
              TODO, will put a table here
            </div>
          </div>
        </div>

  );
}
