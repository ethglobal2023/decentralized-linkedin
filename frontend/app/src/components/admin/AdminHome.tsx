import { FC } from "react";
import { CreateAttestMediaForm, CreateAttestPublicInterview } from "./AdminCreateAttestation";
import { AdminManualVerificationInbox } from "./AdminManualVerificationInbox";


export const AdminHome: FC = () => {
  return <div>
    <h2>Admin Home</h2>
   <CreateAttestMediaForm/>
    <CreateAttestPublicInterview/>
    <h2>Manual Verification Inbox</h2>
    <AdminManualVerificationInbox/>
  </div>;
}