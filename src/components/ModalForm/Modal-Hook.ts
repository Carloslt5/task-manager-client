import { useState } from 'react'

export const useModalHook = () => {

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(!showModal)

  return {
    showModal,
    toggleModal
  }
}