import { ModalContent } from "./ModalContent";
import { ModalForm } from "./ModalForm";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  open: boolean;
  onClose: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onClose,
}) => {
  return (
    <ModalForm onClose={onClose}>
      <ModalContent>
        <div className="flex flex-col items-center justify-center gap-2 p-6">
          <div className="flex flex-col items-center justify-center gap-6">
            <p className="text-white">{message}</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={onClose}
                type="button"
                className="px-3 py-2 text-sm text-neutral-500 bg-white rounded-sm hover:bg-neutral-100 focus:ring-2 focus:outline-hidden focus:ring-primary-300 hover:text-neutral-900 dark:bg-neutral-700 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-white dark:hover:bg-neutral-600 dark:focus:ring-neutral-600"
              >
                No, cancel
              </button>
              <button
                onClick={onConfirm}
                type="button"
                className="px-3 py-2 text-sm text-white bg-red-600 rounded-sm hover:bg-red-700 focus:ring-2 focus:outline-hidden focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      </ModalContent>
    </ModalForm>
  );
};
