import React from "react";
import { useNavigate } from "react-router-dom";

export default function Avatar({ profileUrl, onClick, className }) {
  const navigate = useNavigate();
  return (
    <img
      src={profileUrl}
      alt=""
      onClick={onClick}
      className={`${className} h-[40px] w-[40px] cursor-pointer rounded-full object-cover hover:opacity-90`}
    />
  );
}
