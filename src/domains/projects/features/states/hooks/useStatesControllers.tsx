import { useCallback } from "react";

import { useDeleteState } from "./useDeleteState";
import { useFetchStates } from "./useFetchStates";
import { useStateCeate } from "./useStateCeate";
import { useUpdateState } from "./useUpdateState";
import { State } from "../states.type";

export const useStatesControllers = (projectId?: string) => {
  //Get states in project
  const { data: states, isLoading: isLoadingStates, isError: isErrorStates } = useFetchStates(projectId!);

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
  const deleteStateMutation = useDeleteState(projectId!);
  const handleDeleteState = useCallback(
    (stateId: string) => {
      deleteStateMutation.mutate(stateId);
    },
    [deleteStateMutation],
  );

  return {
    states,
    isLoadingStates,
    isErrorStates,
    handleStatesCreate,
    handleDeleteState,
    handleUpdateStates,
  };
};
