import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SupabaseContext } from "../contexts/SupabaseContext";

export const Profile: FC = () => {
  const { address: profileAddress } = useParams();
  const supabase = useContext(SupabaseContext);
  const [profile, setProfile] = useState<any>(); //TODO Type this with the real type from supabase. It's missing in the generated code. Alter gen-types.sh to fix.
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!profileAddress) return;

        const fetchedProfile = await supabase
          .from("people_search")
          .select("*")
          .eq("pk", profileAddress)
          .single();
        setProfile(fetchedProfile);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchProfile();
  }, [profileAddress]);

  if (!profileAddress) return <div>Profile not found</div>;
  return (
    <div>
      Profile
      {JSON.stringify(profile)}
      {JSON.stringify(error)}
    </div>
  );
};
