import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Modal({
  children,
  modalFor,
  className,
  open,
  setOpen,
}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={className}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        {modalFor}
      </button>
      {open === true && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="fixed left-0 top-0 z-20 grid h-[100vh] w-[100vw] place-items-center bg-black/10"
        >
          <section className="relative h-[fit-content] w-[fit-content] rounded-md border-[1px] bg-white px-4 py-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="absolute right-4 top-1 text-xs"
            >
              <FontAwesomeIcon icon={faX} />
            </button>
            {children}
          </section>
        </div>
      )}
    </div>
  );
}
