import { useCallback } from "react";

import { useStateCeate } from "./useStateCeate";
import { State } from "../states.type";

export const useStateControllers = (projectId: string) => {
  // Add state in project
  const addStateMutation = useStateCeate(projectId);
  const handleStatesCreate = useCallback(
    (newStateData: Partial<State>) => {
      addStateMutation.mutate(newStateData);
    },
    [addStateMutation],
  );
  return {
    handleStatesCreate,
  };
};
