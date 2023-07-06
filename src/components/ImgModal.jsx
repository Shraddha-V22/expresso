import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Children } from "react";
import { useState } from "react";

export default function ImgModal({ children, openImg, setOpenImg }) {
  return (
    openImg && (
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed left-0 top-0 z-30 grid h-[100vh] w-[100vw] place-items-center bg-black/80"
      >
        <button
          onClick={() => setOpenImg(false)}
          className="absolute right-4 top-4 h-8 w-8 hover:bg-gray-800"
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        {children}
      </div>
    )
  );
}
