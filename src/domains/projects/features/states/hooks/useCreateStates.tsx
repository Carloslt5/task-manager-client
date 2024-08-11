import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY_STATES } from "../states.constants";
import { createStateInProject } from "../states.services";
import { State } from "../states.type";

export const useCreateStates = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newStateData: State) => {
      return createStateInProject(projectId, newStateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_STATES, projectId],
      });
    },
  });
};
