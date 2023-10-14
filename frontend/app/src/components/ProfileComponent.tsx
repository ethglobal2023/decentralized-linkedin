<<<<<<< HEAD:frontend-demo/app/src/components/ProfileComponent.tsx
import React, { useState } from "react";
import ProfileCard from "./ProfileCard
import ProfileEdit from "./ProfileEdit";

export default function ProfileComponent() {
  const [isEdit, setisEdit] = useState(false);
=======
import React, { useContext, useEffect, useState } from "react";
import ProfileEdit from "./ProfileEdit";
import ProfileCard from "./ProfileCard"
import { useParams } from "react-router-dom";
import { SupabaseContext } from "../contexts/SupabaseContext";
import { cloudflareIPFSDownload, supabaseIPFSDownload } from "../ipfs";


export default function ProfileComponent() {
  const supabase = useContext(SupabaseContext);
  const [isEdit, setisEdit] = useState(false);
  const { address} = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
      const fetchData = async () => {
        try {
          if(!address) return;

          //Get CID from supabase
          const { data } = await supabase.from('resumes').select('cid').eq('address', address).single();
          if(!data?.cid) throw new Error("No CID found for this address")

          let profileText = ""
          // First try to download from CloudFlare IPFS, then fallback to Supabase IPFS
          try {
            profileText = await cloudflareIPFSDownload(data?.cid);
          } catch (e: any){
            profileText = await supabaseIPFSDownload(data.cid);
          }
          if(!profileText) throw new Error("No profile found for this address")
          const profile = JSON.parse(profileText);
          setData(profile);
        } catch (error: any) {
          console.error('Error fetching data:', error);
          setError(error.message);
        }
      };

      fetchData();
    }, []);
>>>>>>> main:frontend/app/src/components/ProfileComponent.tsx

  const onEdit = () => {
    setisEdit(!isEdit);
  };
  return (
    <div>
      {isEdit ? (
        <ProfileEdit />
      ) : (
        <ProfileCard />
      )}
    </div>
<<<<<<< HEAD:frontend-demo/app/src/components/ProfileComponent.tsx
  );}
=======
  );
}
>>>>>>> main:frontend/app/src/components/ProfileComponent.tsx
