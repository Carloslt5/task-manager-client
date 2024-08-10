import { useCallback } from "react";

import { useDeleteState } from "./useDeleteState";
import { useStateCeate } from "./useStateCeate";
import { State } from "../states.type";

export const useStateControllers = (projectId: string) => {
  // Add state in project
  const addStateMutation = useStateCeate(projectId!);
  const handleStatesCreate = useCallback(
    (newStateData: Partial<State>) => {
      addStateMutation.mutate(newStateData);
    },
    [addStateMutation],
  );

  // delete state in project
  const deleteStateMutation = useDeleteState(projectId);
  const handleDeleteState = useCallback(
    (stateId: string) => {
      deleteStateMutation.mutate(stateId);
    },
    [deleteStateMutation],
  );

  return {
    handleStatesCreate,
    handleDeleteState,
  };
};
