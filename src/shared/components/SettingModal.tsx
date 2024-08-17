import React, { useState } from "react";

import SettingsIcon from "@mui/icons-material/Settings";

import { ConfirmationModal } from "./ConfirmationModal";
import { useModalHook } from "../hooks/useModalHook";

interface SettingModalProps {
  readonly textData: string;
  readonly deleteEntity: () => void;
}

const SettingModal: React.FC<SettingModalProps> = ({ textData, deleteEntity }) => {
  const { modalProps, openModal } = useModalHook();

  const [settingModal, setSettingModal] = useState(false);
  const toggleSettingModal = () => setSettingModal(!settingModal);

  return (
    <div className="relative">
      <button className="p-6 edit__title" onClick={toggleSettingModal}>
        <span>
          <SettingsIcon />
        </span>
      </button>
      {settingModal && (
        <div className="absolute right-0 w-32 py-2 mt-1 rounded bg__color top-16 " onClick={toggleSettingModal}>
          <ul className="flex flex-col items-stretch w-full cursor-pointer justify-stretch">
            <li className="p-2 text-center hover:text-red-500" onClick={openModal}>
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
