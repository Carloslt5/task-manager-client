interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm, onCancel }) => {
  const handleConfirm = () => onConfirm();
  const handleCancel = () => onCancel();

  return (
    <div className="modal__form">
      <div className="flex flex-col items-center justify-center gap-2 p-6">
        <div className="flex flex-col items-center justify-center gap-6">
          <p className="text-white">{message}</p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleCancel}
              type="button"
              className="px-3 py-2 text-sm text-gray-500 bg-white rounded hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-primary-300 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
            <button
              onClick={handleConfirm}
              type="button"
              className="px-3 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Yes, I'm sure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
