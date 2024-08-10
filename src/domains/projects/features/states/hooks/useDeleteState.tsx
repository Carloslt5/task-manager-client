import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY_PROJECT } from "@/domains/projects/projects.constants";

import { deleteStateInProject } from "../states.services";

export const useDeleteState = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (stateId: string) => {
      return deleteStateInProject(stateId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_PROJECT, projectId],
      });
    },
  });
};
