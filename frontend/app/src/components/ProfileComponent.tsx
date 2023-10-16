import React, { useContext, useEffect, useState } from "react";
import ProfileEdit from "./ProfileEdit";
import ProfileCard from "./ProfileCard";
import { useParams } from "react-router-dom";
import { SupabaseContext } from "../contexts/SupabaseContext";
import { ipfsDownload } from "../ipfs";
import { Resume } from "../types";

export default function ProfileComponent() {
  const supabase = useContext(SupabaseContext);
  const [isEdit, setisEdit] = useState(false);
  const { address } = useParams();
  const [data, setData] = useState<Resume>();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!address) return;

      try {
        //Get CID from supabase
        const { data } = await supabase
          .from("resumes")
          .select("cid")
          .eq("address", address)
          .single();
        if (!data?.cid) throw new Error("No CID found for this address");

        const profile = await ipfsDownload(data?.cid);
        if (!profile) throw new Error("No profile found for this address");
        setData(profile);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }

      fetchData();
    };
  }, []);

  const onEdit = () => {
    setisEdit(!isEdit);
  };

  return <div>{isEdit ? <ProfileEdit /> : <ProfileCard />}</div>;
}
