import { useState } from 'react'

export const useEditing = () => {
  const [isEditing, setEditing] = useState(false)
  const handlerEditClick = () => setEditing(!isEditing)

  return {
    isEditing,
    setEditing,
    handlerEditClick
  }
}