import React from "react";
import Avatar from "../components/UserAvatar";
import { useStore } from "@dataverse/hooks";

const Account = () => {
  const { address } = useStore();
  return (
    <div>
      Account
      <div>
        <Avatar address={address} />
      </div>
    </div>
  );
};

export default Account;
