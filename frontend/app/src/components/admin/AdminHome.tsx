import React, { FC } from "react";
import {
  CreateAttestMediaForm,
  CreateAttestPublicInterview,
} from "./AdminCreateAttestation";
import { AdminManualVerificationInbox } from "./AdminManualVerificationInbox";
import { ProfileMediaCard } from "../ProfileMediaCard";

export const AdminHome: FC = () => {
  return (
    <div className={"flex-col gap-4"}>
      <div className={"m-2"}>
        <CreateAttestMediaForm />
      </div>
      <div className={"m-2"}>
        <CreateAttestPublicInterview />
      </div>
      <div className={"flex-col space-y-2"}>
        <AdminManualVerificationInbox />
        <ProfileMediaCard cid={"cid:testcid4"} mediaType={"publication"} />
        <ProfileMediaCard
          cid={`cid:testcid${Date.now()}`}
          mediaType={"publication"}
        />
      </div>
    </div>
  );
};
