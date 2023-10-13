import React, { useState } from "react";
import ProfileCard from "./ProfileCard
import ProfileEdit from "./ProfileEdit";

export default function ProfileComponent() {
  const [isEdit, setisEdit] = useState(false);

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
  );}