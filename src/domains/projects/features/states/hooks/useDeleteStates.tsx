import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY_STATES } from "../states.constants";
import { deleteStateInProject } from "../states.services";

export const useDeleteStates = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (stateId: string) => {
      return deleteStateInProject(stateId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_STATES, projectId],
      });
    },
  });
};
