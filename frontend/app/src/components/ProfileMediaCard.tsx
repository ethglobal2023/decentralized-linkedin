// Component that renders a media card for a user's profile page
// Such cards would be things like "interviews" "conference_talks" "podcasts" "videos"
import { SubmitHandler, useForm } from "react-hook-form";
import { BACKEND_URL } from "./admin/EASConfigContext";
import { useWallet } from "../hooks/useWallet";
import { useContext, useEffect, useState } from "react";
import { SupabaseContext } from "../contexts/SupabaseContext";
import { useSignMessage, useWalletClient } from "wagmi";
import { MessageWithViemSignature } from "./admin/types";


type RequestVerificationMessage = {
  account: string;
  cid: string;
  mediaType: string;
};

type ManualVerificationRequestStatuses =
  | "not-started"
  | "pending"
  | "done"
  | "error";

export const ProfileMediaCard: React.FC<{
  cid: string;
  mediaType: "conference_talk" | "publication" | "interview"; //change validation in backend/eas/request-manual-verification.ts to add new types
}> = ({ cid, mediaType }) => {
  const { address } = useWallet();
  const {data: walletClient} = useWalletClient();
  const [loadingVerificationRequest, setLoadingVerificationRequest] =
    useState(false);
  const [verificationStatus, setVerificationStatus] =
    useState<ManualVerificationRequestStatuses>();
  const [jsonResponse, setJsonResponse] = useState("");
  const [error, setError] = useState("");
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<{}>();

  const supabase = useContext(SupabaseContext);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("manual_review_inbox")
        .select("*")
        .eq("cid", cid)
        .eq("account", address?.toLowerCase() || "")
        .single();

      if (!data) {
        setVerificationStatus("not-started");
        return;
      }

      if (error) {
        console.error("Failed to fetch verification status: ", error);
        setVerificationStatus("error");
        return;
      }

      setVerificationStatus(data?.status ? "done" : "pending");
    };
    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const onSubmitManualVerificationRequest: SubmitHandler<{}> = async (data) => {
    if (!walletClient || !address || address.length === 0){
      setError("You must be connected w/ a browser wallet to request verification");
      return
    }
    try {
      setLoadingVerificationRequest(true);
      const message: RequestVerificationMessage = {
        account: address?.toLowerCase(), //TODO This isn't a reliable value. When you have the user sign, remove this field and get their account on the backend.
        cid,
        mediaType,
      };

      const signature = await walletClient.signMessage({
        account: address,
        message: JSON.stringify(message),
      });

      const requestBody: MessageWithViemSignature<RequestVerificationMessage> = {message, signature}

      const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };

      console.log(
        "Requesting verification with",
        requestBody,
        ` to ${BACKEND_URL}/eas/request-verification`,
      );

      const res = await fetch(
        `${BACKEND_URL}/eas/request-verification`,
        requestOptions,
      ).then((response) => response.json());
      setJsonResponse(res);
      setError("")
      console.log("Finished requesting verification", res);
    } catch (e: any) {
      console.log("Failed to request veification", e);
      setError(e);
    }
    setLoadingVerificationRequest(false);
  };

  const backgroundColor = () => {
    switch (verificationStatus) {
      case "not-started":
        return "gray";
      case "pending":
        return "yellow";
      case "done":
        return "green";
      case "error":
        return "red";
    }
    return "gray";
  };
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <div className={"flex flex-col items-center justify-center"}>
        <form
          onSubmit={handleSubmit(onSubmitManualVerificationRequest)}
          className={"flex-col border-2"}
        >
          <div className={"text-lg font-bold"}>
            Click me to submit a verification request to the inbox
            <button
              type={"submit"}
              className={"p-8 "}
              style={{ backgroundColor: backgroundColor() }}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
