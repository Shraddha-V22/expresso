import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Modal({ children, modalFor, className }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        className={className}
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        {modalFor}
      </button>
      {open === true && (
        <div
          onClick={handleClose}
          className="fixed left-0 top-0 z-20 grid h-[100vh] w-[100vw] place-items-center bg-black/10"
        >
          <button onClick={handleClose} className="absolute right-8 top-4">
            <FontAwesomeIcon icon={faX} />
          </button>
          <section className="h-[fit-content] w-[fit-content] rounded-md border-[1px] bg-white p-4">
            {children}
          </section>
        </div>
      )}
    </div>
  );
}
