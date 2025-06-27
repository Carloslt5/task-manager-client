import React, { useMemo } from "react";

export type ModalProps = {
  onClose: () => void;
  open: boolean;
};

export const useModalHook = () => {
  const [open, setOpen] = React.useState(false);

  return useMemo(() => {
    const modalProps: ModalProps = {
      onClose: () => setOpen(false),
      open,
    };
    return {
      openModal: () => setOpen(true),
      closeModal: () => setOpen(false),
      modalProps,
    };
  }, [open]);
};
