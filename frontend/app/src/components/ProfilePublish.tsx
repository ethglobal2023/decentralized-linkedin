import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BACKEND_URL } from "./admin/EASConfigContext";
import { MessageWithViemSignature } from "./admin/types";
import { useWallet } from "../hooks/useWallet";
import { useWalletClient } from "wagmi";

type PublishResumeMessage = {
  account: string;
  resume: string;
};
type FormInputs = {
  payload: string;
};

export function ProfilePublish() {
  const [payload, setPayload] = useState("");
  const [cid, setCid] = useState(null);
  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);
  const { address } = useWallet();
  const { data: walletClient } = useWalletClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      payload: `{"vc":[{"type":"VerifiablePresentation","proof":{"type":"DataIntegrityProof","domain":"4jt78h47fh47","created":"2018-09-14T21:19:10Z","challenge":"1f44d55f-f161-4938-a659-f8026467f126","proofValue":"zqpLMweBrSxMY2xHX5XTYV8nQAJeV6doDwLWxQeVbY4oey5q2pmEcqaqA3Q1gVHMrXFkXM3XKaxup3tmzN4DRFTLV","cryptosuite":"eddsa-2022","proofPurpose":"authentication","verificationMethod":"did:example:ebfeb1f712ebc6f1c276e12ec21#keys-1"},"@context":["https://www.w3.org/ns/credentials/v2","https://www.w3.org/ns/credentials/examples/v2"],"verifiableCredential":[{"id":"http://university.example/credentials/1872","type":["VerifiableCredential","ExampleAlumniCredential"],"proof":{"type":"DataIntegrityProof","created":"2023-06-18T21:19:10Z","proofValue":"zQeVbY4oey5q2M3XKaxup3tmzN4DRFTLVqpLMweBrSxMY2xHX5XTYV8nQApmEcqaqA3Q1gVHMrXFkXJeV6doDwLWx","cryptosuite":"eddsa-2022","proofPurpose":"assertionMethod","verificationMethod":"https://university.example/issuers/565049#key-1"},"issuer":"https://university.example/issuers/565049","@context":["https://www.w3.org/ns/credentials/v2","https://www.w3.org/ns/credentials/examples/v2"],"validFrom":"2010-01-01T19:23:24Z","credentialSubject":{"id":"did:example:ebfeb1f712ebc6f1c276e12ec21","alumniOf":{"id":"did:example:c276e12ec21ebfeb1f712ebc6f1","name":"Example University"}}}]}],"dids":["did:pkh:arweave:7wIU:kY9RAgTJEImkBpiKgVeXrsGV02T-D4dI3ZvSpnn7HSk","did:pkh:eip155:1:0xb9c5714089478a327f09197987f16f9e5d936e8a"],"pubKey":"0xb9c5714089478a327f09197987f16f9e5d936XXX","lastName":"von Neumann","firstName":"John","languages":[{"name":"english","level":"a2"},{"name":"german","level":"native"},{"name":"hungarian","level":"native"}],"educations":[{"end":"1929-10-12 00:00:00.00Z","links":[{"href":"ia903008.us.archive.org/31/items/A_C_WalczakTypke___Axiomatic_Set_Theory/Lecturenotes2006-2007eng.pdf","name":"Full thesis"},{"href":"en.wikipedia.org/wiki/Von_Neumann%E2%80%93Bernays%E2%80%93G%C3%B6del_set_theory","name":"Discussion"}],"start":"1925-10-12 00:00:00.00Z","title":"PHD","company":{"dns":"eth.ch","name":"ETH Zurich","preferredIcon":"https://ethz.ch/etc/designs/ethz/img/icons/ETH-APP-Icons-Theme-white/192-xxxhpdi.png"},"keywords":["set theory","ZFC","first order logic"],"description":"PHD title The axiomatic construction of general set theory"}],"description":"Hungarian-American mathematician, physicist, computer scientist, engineer and polymath.","occupations":[{"end":"1929-10-12 00:00:00.00Z","links":[{"href":"ia903008.us.archive.org/31/items/A_C_WalczakTypke___Axiomatic_Set_Theory/Lecturenotes2006-2007eng.pdf","name":"Full thesis"},{"href":"en.wikipedia.org/wiki/Von_Neumann%E2%80%93Bernays%E2%80%93G%C3%B6del_set_theory","name":"Discussion"}],"start":"1925-10-12 00:00:00.00Z","title":"Theoretical Chemistry Researcher","company":{"dns":"eth.ch","name":"ETH Zurich","preferredIcon":"https://ethz.ch/etc/designs/ethz/img/icons/ETH-APP-Icons-Theme-white/192-xxxhpdi.png"},"keywords":["set theory","ZFC","first order logic"],"description":"Research work related to The axiomatic construction of general set theory"}],"publications":[{"cid":"bafybeibhh6xja3u2gtegmz4afhi53r2xijn73al6b7yfdytsn43fcujoeq","doi":"doi.org/10.1007/978-3-642-61812-3_32","ISBN":"978-3-642-61812-3","href":"link.springer.com/chapter/10.1007/978-3-642-61812-3_32","type":"classic-peer-reviewed","title":"Preliminary Discussion of the Logical Design of an Electronic Computing Instrument","idChecks":[{"did":"did:pkh:arweave:XXXX:kY9RAgTJEImkBpiKgVeXrsGV02T-D4dI3ZvSpnn7HSk","sig":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"}],"keywords":["Memory Capacity","Delay Line","Memory Location","Function Table","Memory Organ"],"description":"Inasmuch as the completed device will be a general-purpose computing machine it should contain certain main organs relating to arithmetic, memory- storage, control and connection with the human operator. It is intended that the machine be fully automatic in character, i.e. independent of the human operator after the computation starts","contentChecks":[{"did":"did:pkh:arweave:XXXX:kY9RAgTJEImkBpiKgVeXrsGV02T-D4dI3ZvSpnn7HSk","sig":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"}]},{"cid":"bafybeic4gxngkwll4lfoljlvtxij5oewqbxsgayubxhhqdyipjmozp5ymu","href":"https://www.youtube.com/watch?v=vLbllFHBQM4","type":"media-interview","title":"America's Youth Wants To Know"},{}],"preferredName":"von Neumann","preferredTitle":"Lecturer","skill_keywords":["set theory","methematics"],"eoaAttestations":[],"preferredLocation":"Zurich and London"}`,
    }
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data, event) => {
    event?.preventDefault();

    try {
      if (!walletClient) throw new Error("Wallet client not initialized");
      if (!address) throw new Error("Wallet address not initialized");

      const message: PublishResumeMessage = {
        account: address?.toLowerCase(),
        resume: data.payload,
      };

      const signature = await walletClient.signMessage({
        account: address,
        message: JSON.stringify(message),
      });

      const requestBody: MessageWithViemSignature<PublishResumeMessage> = {
        message,
        signature,
      };

      const res2 = await fetch(`${BACKEND_URL}/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // headers: { 'Content-Type': 'multipart/form-data' },
        body: JSON.stringify(requestBody),
      }).then((res) => res.json());


      setResponse(res2);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          rows={20}
          placeholder="Enter payload"
          className={"border-2 border-blue-300 w-96"}
          {...register("payload", { required: true })}
        />
        <button className={"bg-blue-300"} type="submit">Upload to IPFS</button>
      </form>
      {cid && <div>CID: {cid}</div>}
      {error && <div>Error: {error}</div>}
      {response && JSON.stringify(response)}
    </div>
  );
}