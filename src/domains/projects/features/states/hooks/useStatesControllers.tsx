import { useCallback } from "react";

import { useCreateStates } from "./useCreateStates";
import { useDeleteStates } from "./useDeleteStates";
import { useFetchStates } from "./useFetchStates";
import { useUpdateStates } from "./useUpdateStates";
import { State } from "../states.type";

export const useStatesControllers = (projectId?: string) => {
  //Get states in project
  const { data: states, isLoading: isLoadingStates, isError: isErrorStates } = useFetchStates(projectId!);

  // Add state in project
  const addStateMutation = useCreateStates(projectId!);
  const handleCreateStates = useCallback(
    (newStateData: State) => {
      addStateMutation.mutate(newStateData);
    },
    [addStateMutation],
  );

  // Update state in project
  const updateStatesMutation = useUpdateStates(projectId!);
  const handleUpdateStates = useCallback(
    (newStateData: State) => {
      updateStatesMutation.mutate(newStateData);
    },
    [updateStatesMutation],
  );

  // delete state in project
  const deleteStateMutation = useDeleteStates(projectId!);
  const handleDeleteStates = useCallback(
    (stateId: string) => {
      deleteStateMutation.mutate(stateId);
    },
    [deleteStateMutation],
  );

  return {
    states,
    isLoadingStates,
    isErrorStates,
    handleCreateStates,
    handleDeleteStates,
    handleUpdateStates,
  };
};
