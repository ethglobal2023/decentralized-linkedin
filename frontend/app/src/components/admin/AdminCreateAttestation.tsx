import React, { useContext, useState } from "react";
import { useWallet } from "../../hooks/useWallet";
import JSONPretty from "react-json-pretty";
import { SubmitHandler, useForm } from "react-hook-form";
import { BACKEND_URL, EASConfigContext } from "./EASConfigContext";
import { useAccount, useWalletClient } from "wagmi";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { BrowserProvider } from "ethers";

type SupportedAttestationTypes = "metIRL" | "resume";
type FormInputs = {
  recipientAddress: string;
};



export default function AdminCreateAttestation() {
  const { address } = useWallet();
  const { connector } = useAccount();

  const { data: walletClient } = useWalletClient();

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
  if (easChainId === 0) {
    return <div>Could not find EAS config for the current chain</div>;
  }

  if (!walletClient || !connector) {
    return <div>Wallet client or connector is not connected</div>;
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setAttesting(true);
    try {
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
      console.log("eas: ", eas);

      console.log("Getting offchain");
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
          expirationTime: 0n,
          // Unix timestamp of current time
          time: BigInt(time),
          revocable: true,
          version: 1,
          nonce: 0n, //TODO Populate with actual schema
          schema: metIrlSchema,
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
        account: address.toLowerCase(),
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
      setJsonResponse(res);
      console.log("Attested", res);
      setAttesting(false);
    } catch (e) {
      console.log("Failed to attest", e);
    }
    setAttesting(false);
  };



  return (
    <div className="Container">
      <div className="WhiteBox">
        <form onSubmit={handleSubmit(onSubmit)} className={"flex-col border-2"}>
          <div className="Title flex justify-center">
            <p className={"text-xl"}>I attest that I met</p>
          </div>
          <div className={"justify-center border-2 flex"}>
            <div className="w-72">
              <div className="relative h-10 w-full min-w-[200px]">
                <input
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  {...register("recipientAddress", { required: true })}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Met IRL Address
                </label>
                {errors.recipientAddress && <span>This field is required</span>}
              </div>
            </div>
          </div>
          <div className={"flex border-2 p-2"}>

            <input type={"submit"} value={"Submit"} className={"btn"}/>

          </div>
          {/* errors will return when field validation fails  */}
        </form>
        {attesting
          ? "Attesting..."
          : "Waiting for form submission to create attestation"}

        <div>
          <h2>Response</h2>
          {errorMessage && <div className="Error">{errorMessage}</div>}
          <JSONPretty id="json-pretty" data={jsonResponse}/>
        </div>


        <div>
          <h2>Attestations you've issued</h2>
          TODO, will put a table here
        </div>
      </div>
    </div>
  );
}
