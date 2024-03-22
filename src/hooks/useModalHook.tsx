import { useState } from 'react';

export const useModalHook = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    console.log('first');
    setShowModal(!showModal);
  };

  return {
    showModal,
    toggleModal,
  };
};
