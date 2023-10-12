// Component that renders a media card for a user's profile page
// Such cards would be things like "interviews" "conference_talks" "podcasts" "videos"
import { SubmitHandler, useForm } from "react-hook-form";
import { BACKEND_URL } from "./admin/EASConfigContext";
import { useWallet } from "../hooks/useWallet";
import { useContext, useEffect, useState } from "react";
import { SupabaseContext } from "./SupabaseContext";

type RequestVerificationBody = {
  account: string;
  cid: string;
  mediaType: string;
};
type ConfirmVerificationBody = {
  account: string;
  cid: string;
};
type ManualVerificationRequestStatuses =
  | "not-started"
  | "pending"
  | "done"
  | "error";

export const ConfirmButton: React.FC<{ cid: string }> = ({ cid }) => {
  const { address } = useWallet();
  const [jsonResponse, setJsonResponse] = useState("");
  const [error, setError] = useState("");
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<{}>();
  const supabase = useContext(SupabaseContext);

  const onConfirmManualVerificationRequest: SubmitHandler<{}> = async (
    data,
  ) => {
    try {
      if (!address || address.length === 0) {
        setError(
          "You must be connected w/ a browser wallet to request verification",
        );
        return;
      }
      const requestBody: ConfirmVerificationBody = {
        account: address?.toLowerCase(), //TODO This isn't a reliable value. When you have the user sign, remove this field and get their account on the backend.
        cid,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };

      console.log("Confirming verification", requestBody);
      console.log("BACKEND_URL", BACKEND_URL);
      // call attest api endpoint to store attestation on ComposeDB
      console.log(`${BACKEND_URL}/eas/request-verification`);
      const res = await fetch(
        `http://localhost:3005/eas/confirm-verification`,
        requestOptions,
      ).then((response) => response.json());
      console.log("Finished requesting verification, getting JSON", res);
      setJsonResponse(res);
      console.log("Finished requesting verification", res);

      //TODO You'd create an attestation here
    } catch (e: any) {
      console.log("Failed to request veification", e);
      setError(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onConfirmManualVerificationRequest)}
      className={"flex border-2"}
    >
        <button
          type={"submit"}
          className={"p-8 "}
          style={{ backgroundColor: "purple" }}
        >
          SUBMIT
        </button>
    </form>
  );
};

export const ProfileMediaCard: React.FC<{
  cid: string;
  mediaType: "conference_talk" | "publication" | "interview"; //change validation in backend/eas/request-manual-verification.ts to add new types
}> = ({ cid, mediaType }) => {
  const { address } = useWallet();
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
    const intervalId = setInterval(async () => {
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

      setVerificationStatus(data?.fulfilled ? "done" : "pending");
    }, 2000); // Convert seconds to milliseconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const onSubmitManualVerificationRequest: SubmitHandler<{}> = async (data) => {
    try {
      setLoadingVerificationRequest(true);
      if (!address || address.length === 0) {
        setError(
          "You must be connected w/ a browser wallet to request verification",
        );
        return;
      }
      const requestBody: RequestVerificationBody = {
        account: address?.toLowerCase(), //TODO This isn't a reliable value. When you have the user sign, remove this field and get their account on the backend.
        cid,
        mediaType,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };

      console.log("Requesting verification", requestBody);
      console.log("BACKEND_URL", BACKEND_URL);
      // call attest api endpoint to store attestation on ComposeDB
      console.log(`${BACKEND_URL}/eas/request-verification`);
      const res = await fetch(
        `http://localhost:3005/eas/request-verification`,
        requestOptions,
      ).then((response) => response.json());
      console.log("Finished requesting verification, getting JSON", res);
      setJsonResponse(res);
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
        <ConfirmButton cid={cid}/>
      </div>
    </div>
  );
};
