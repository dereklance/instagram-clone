import type { ComponentProps } from "react";
import { useState } from "react";
import { Modal } from "../common/components/Modal";

const ConfirmCloseModal = ({
  onDiscard,
  onCancel,
  open,
}: {
  onDiscard: () => void;
  onCancel: () => void;
  open: boolean;
}) => {
  return (
    <Modal open={open} className="text-center">
      <div className="px-16 py-6">
        <div className="mb-1 text-lg font-semibold">Discard post?</div>
        <div className="text-sm text-black/50">
          If you leave, your edits won&apos;t be saved.
        </div>
      </div>

      <Modal.Button className="font-semibold text-red-500" onClick={onDiscard}>
        Discard
      </Modal.Button>
      <Modal.Button onClick={onCancel}>Cancel</Modal.Button>
    </Modal>
  );
};

export const CreatePostModal = ({
  open,
  onClose: onCreatePostModalClose,
}: ComponentProps<typeof Modal>) => {
  const [confirmCloseModalOpen, setConfirmCloseModalOpen] = useState(false);

  const confirmClose = () => {
    onCreatePostModalClose?.();
    setConfirmCloseModalOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => setConfirmCloseModalOpen(true)}
        className="h-[60vh] w-[60vw]"
      >
        <Modal.Title>Create new post</Modal.Title>
      </Modal>

      <ConfirmCloseModal
        open={confirmCloseModalOpen}
        onCancel={() => setConfirmCloseModalOpen(false)}
        onDiscard={confirmClose}
      />
    </>
  );
};
