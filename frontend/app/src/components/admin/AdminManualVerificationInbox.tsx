// Component that renders a media card for a user's profile page
// Such cards would be things like "interviews" "conference_talks" "podcasts" "videos"
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { SupabaseContext } from "../../contexts/SupabaseContext";
import { Database } from "../../__generated__/supabase-types";

type VerificationRequest =
  Database["public"]["Tables"]["manual_review_inbox"]["Row"];
type ConfirmVerificationBody = {
  account: string;
  cid: string;
};

export const AdminManualVerificationInbox: React.FC = () => {
  const supabase = useContext(SupabaseContext);

  const [requests, setRequests] = useState<VerificationRequest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("manual_review_inbox")
        .select("*")
        .eq("fulfilled", false);

      if (error) {
        console.error(error);
        return;
      }

      setRequests(data);
    };
    fetchData()
    const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Admin Inbox</h2>
      {requests.map((request) => (
        <InboxRow cid={request.cid} account={request.account} />
      ))}
    </div>
  );
};

const InboxRow: React.FC<{ account: string; cid: string }> = ({
  account,
  cid,
}) => {
  const [jsonResponse, setJsonResponse] = useState("");
  const [error, setError] = useState("");
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<{}>();
  const onConfirmManualVerificationRequest: SubmitHandler<{}> = async (
    data,
  ) => {
    try {
      if (!account || account.length === 0) {
        setError(
          "You must be connected w/ a browser wallet to request verification",
        );
        return;
      }

      //TODO You'd create an attestation here

      const requestBody: ConfirmVerificationBody = {
        account: account?.toLowerCase(), //TODO This isn't a reliable value. When you have the user sign, remove this field and get their account on the backend.
        cid,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };

      console.log("Confirming verification", requestBody);

      const res = await fetch(
        `http://localhost:3005/eas/confirm-verification`,
        requestOptions,
      ).then((response) => response.json());
      setJsonResponse(res);
      console.log("Finished confirming verification", res);
      setError("");
    } catch (e: any) {
      console.log("Failed to confirm verification", e);
      setError(e);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onConfirmManualVerificationRequest)}
        className="flex items-center border-2 p-2"
      >
        <img className={"h-8 w-8 border-2 mr-4"} alt={"MEDIA"} />
        <p className="mr-4">{cid}</p>
        <p className="mr-4">{account}</p>
        <button
          type={"submit"}
          className={"p-2 bg-purple-600 text-white rounded-lg"}
        >
          SUBMIT
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};
