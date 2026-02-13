import SettingsIcon from "@mui/icons-material/Settings";
import React, { useState } from "react";

import { useModalHook } from "../hooks/useModalHook";
import { ConfirmationModal } from "./ConfirmationModal";

interface SettingModalProps {
  readonly textData: string;
  readonly deleteEntity: () => void;
}

const SettingModal: React.FC<SettingModalProps> = ({
  textData,
  deleteEntity,
}) => {
  const { modalProps, openModal } = useModalHook();

  const [settingModal, setSettingModal] = useState(false);
  const toggleSettingModal = () => setSettingModal(!settingModal);

  return (
    <div className="relative">
      <button
        className="p-6 flex items-center rounded-sm text-primary-700 hover:bg-primary-200 dark:text-white dark:hover:bg-neutral-500"
        onClick={toggleSettingModal}
      >
        <span>
          <SettingsIcon />
        </span>
      </button>
      {settingModal && (
        <div
          className="absolute right-0 w-32 py-2 mt-1 rounded-sm bg-primary-600 dark:bg-neutral-950 top-16 "
          onClick={toggleSettingModal}
        >
          <ul className="flex flex-col items-stretch w-full cursor-pointer justify-stretch">
            <li
              className="p-2 text-center hover:text-red-500"
              onClick={openModal}
            >
              {textData}
            </li>
          </ul>
        </div>
      )}
      {modalProps.open && (
        <ConfirmationModal
          message="Are you SURE you want to DELETE ALL PROJECT?"
          onConfirm={deleteEntity}
          {...modalProps}
        />
      )}
    </div>
  );
};

export default SettingModal;
