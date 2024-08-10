import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY_PROJECT } from "@/domains/projects/projects.constants";

import { createStateInProject } from "../states.services";
import { State } from "../states.type";

export const useStateCeate = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newStateData: Partial<State>) => {
      return createStateInProject(projectId, newStateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_PROJECT, projectId],
      });
    },
  });
};
