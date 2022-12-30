import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { IoClose as CloseIcon } from "react-icons/io5";

const ModalBackdrop = ({
  children,
  onClose,
}: PropsWithChildren<{ onClose?: () => void }>) => {
  const [shouldClose, setShouldClose] = useState(false);

  const handleMouseDown = () => {
    setShouldClose(true);
  };

  const handleMouseUp = () => {
    if (shouldClose) {
      onClose?.();
    }
    setShouldClose(false);
  };

  return (
    <div
      className="fixed z-10 flex h-screen w-screen items-center justify-center bg-black/60"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {onClose ? (
        <button className="absolute top-4 right-4 text-white">
          <CloseIcon size={28} />
        </button>
      ) : null}

      {children}
    </div>
  );
};

const ModalBody = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={`rounded-xl bg-white ${className}`}>{children}</div>;
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

const ModalTitle = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex justify-center border-b border-b-black/20 p-2 font-semibold">
      {children}
    </div>
  );
};

const ModalButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`w-full border-t border-t-black/20 py-4 px-8 text-sm ${props.className}`}
    />
  );
};

export const Modal = ({
  children,
  open,
  onClose,
  className,
}: PropsWithChildren<{
  open: boolean;
  onClose?: () => void;
  className?: string;
}>) => {
  const modal = useRef<Element | null>(document.getElementById("modal-root"));

  return modal.current && open
    ? createPortal(
        <ModalBackdrop onClose={onClose}>
          <ModalBuffer>
            <ModalBody className={className}>{children}</ModalBody>
          </ModalBuffer>
        </ModalBackdrop>,
        modal.current
      )
    : null;
};

Modal.Title = ModalTitle;
Modal.Button = ModalButton;
