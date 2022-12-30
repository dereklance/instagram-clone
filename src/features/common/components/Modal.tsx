import type { PropsWithChildren } from "react";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { IoClose as CloseIcon } from "react-icons/io5";

const ModalBackdrop = ({
  children,
  onClose,
}: PropsWithChildren<{ onClose: () => void }>) => {
  const [shouldClose, setShouldClose] = useState(false);

  const handleMouseDown = () => {
    setShouldClose(true);
  };

  const handleMouseUp = () => {
    if (shouldClose) {
      onClose();
    }
    setShouldClose(false);
  };

  return (
    <div
      className="fixed z-10 flex h-screen w-screen items-center justify-center bg-black/60"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <button className="absolute top-4 right-4 text-white">
        <CloseIcon size={28} />
      </button>
      {children}
    </div>
  );
};

const ModalBody = ({ children }: PropsWithChildren) => {
  return <div className="rounded-xl bg-white">{children}</div>;
};

const ModalBuffer = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="z-20 p-8"
      onMouseDown={(event) => event.stopPropagation()}
      onMouseUp={(event) => event.stopPropagation()}
    >
      {children}
    </div>
  );
};

export const Modal = ({
  children,
  open,
  onClose,
}: PropsWithChildren<{ open: boolean; onClose: () => void }>) => {
  const modal = useRef<Element | null>(document.getElementById("modal-root"));

  return modal.current && open
    ? createPortal(
        <ModalBackdrop onClose={onClose}>
          <ModalBuffer>
            <ModalBody>{children}</ModalBody>
          </ModalBuffer>
        </ModalBackdrop>,
        modal.current
      )
    : null;
};
