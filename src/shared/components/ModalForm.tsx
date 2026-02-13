import { ReactNode } from "react";

type Props = {
  readonly children: ReactNode;
  readonly onClose: () => void;
};

export const ModalForm: React.FC<Props> = ({ children, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 top-0 left-0 right-0 z-50 flex items-start justify-center max-w-full max-h-full p-4 overflow-hidden  bg-neutral-900/70 dark:bg-neutral-900/70 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex justify-center max-w-[80%] min-w-[80%] dark:bg-neutral-900"
      >
        {children}
      </div>
    </div>
  );
};
