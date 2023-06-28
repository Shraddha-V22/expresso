import React from "react";
import { useNavigate } from "react-router-dom";

export default function Avatar({ profileUrl, profileId, className }) {
  const navigate = useNavigate();
  return (
    <img
      src={profileUrl}
      alt=""
      onClick={() => navigate(`/${profileId}`)}
      className={`${className} h-[40px] w-[40px] cursor-pointer rounded-full object-cover hover:opacity-90`}
    />
  );
}
