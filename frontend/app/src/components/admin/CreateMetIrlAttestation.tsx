import React, { useContext, useState } from "react";
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useWallet } from "../../hooks/useWallet";
import JSONPretty from "react-json-pretty";
import { SubmitHandler, useForm } from "react-hook-form";
import { BACKEND_URL, EASConfigContext } from "./EASConfigContext";
import { usePublicClient, useWalletClient } from "wagmi";
import { useProvider, useSigner } from "./eas-wagmi-tools";

type SupportedAttestationTypes = "metIRL" | "resume";
type FormInputs = {
  recipientAddress: string;
};
export default function AdminCreateAttestation() {
  const { address } = useWallet();
  const signer = useSigner();
  const provider = usePublicClient();

  const [attesting, setAttesting] = useState(false);
  const [jsonResponse, setJsonResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const { chainId: easChainId, eas, metIrlSchema } = useContext(EASConfigContext);


  if (!address || address.length === 0) {
    return (
      <div>
        You must be connected w/ a browser wallet to create an attestation
      </div>
    );
  }
  if (easChainId === 0) {
    return <div>Could not find EAS config for the current chain</div>;
  }
  if(!signer){
    return <div>Could not find signer</div>
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setAttesting(true);
    try {
      eas.connect(signer);

      const offchain = await eas.getOffchain();

      // TODO, I feel like we could download the schema from the chain
      // TODO Also, we could use an EAS registry that the user isn't signed into here. We'd only need to read the schema
      const schemaEncoder = new SchemaEncoder("bool metIRL");
      const encoded = schemaEncoder.encodeData([
        { name: "metIRL", type: "bool", value: true },
      ]);

      const time = Math.floor(Date.now() / 1000);
      const offchainAttestation =
        await offchain.signOffchainAttestation(
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
            refUID: //This field is for when you're referencing another attestation. For us, it's unset because this attestation is new.
              "0x0000000000000000000000000000000000000000000000000000000000000000",
            data: encoded,
          },
          signer,
        );
      // un-comment the below to process an on-chain timestamp
      // const transaction = await eas.timestamp(offchainAttestation.uid);
      // // Optional: Wait for the transaction to be validated
      // await transaction.wait();
      const userAddress = await signer.getAddress();
      console.log("userAddress", userAddress);
      console.log(signer);
      const requestBody = {
        ...offchainAttestation,
        account: userAddress.toLowerCase(),
        attestationType: "metIrl",
      };
      console.log(address);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };
      // call attest api endpoint to store attestation on ComposeDB
      const res = await fetch(
        `${BACKEND_URL}/eas/attest`,
        requestOptions,
      ).then((response) => response.json());
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
          <input type={"submit"} />
        </form>
          {attesting
            ? "Attesting..."
            : status === "connected"
            ? "Make Offchain attestation"
            : "Connect wallet"}


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
