import { useCallback } from "react";

import { useDeleteState } from "./useDeleteState";
import { useStateCeate } from "./useStateCeate";
import { useUpdateState } from "./useUpdateState";
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

  // Update state in project
  const updateStatesMutation = useUpdateState(projectId!);
  const handleUpdateStates = useCallback(
    (newStateData: Partial<State>) => {
      updateStatesMutation.mutate(newStateData);
    },
    [updateStatesMutation],
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
    handleUpdateStates,
  };
};
