import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY_PROJECT } from "@/domains/projects/projects.constants";

import { updateStateInProject } from "../states.services";
import { State } from "../states.type";

export const useUpdateState = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newStateData: Partial<State>) => {
      return updateStateInProject(newStateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_PROJECT, projectId],
      });
    },
  });
};
