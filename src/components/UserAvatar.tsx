import React, { useEffect, useState } from "react";
import { AvatarProps } from "../utils/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUser } from "lucide-react";

const contextAvatar = (address?: string) =>
  address ? `https://mint.fun/api/avatar/${address}?size=150` : "";

const UserAvatar = (props: AvatarProps) => {
  const [avatarSrc, setAvatarSrc] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const load = async () => {
    setAvatarSrc(contextAvatar(props.address));
  };

  useEffect(() => {
    load();
  }, [props.address]);

  useEffect(() => {
    setAvatar(avatarSrc);
  }, [avatarSrc]);

  return (
    <Avatar className={props.className}>
      <AvatarImage src={avatar} />
      <AvatarFallback>
        <CircleUser className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  );
};
//   <img src={avatar} alt={props.address} className={props.className} />

export default UserAvatar;
