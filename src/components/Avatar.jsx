import React from "react";

export default function Avatar({ profileUrl, onClick, className }) {
  return (
    <img
      src={profileUrl}
      alt=""
      onClick={onClick}
      className={`${className} h-[40px] w-[40px] cursor-pointer rounded-full object-cover hover:opacity-90`}
    />
  );
}
