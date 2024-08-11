import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY_PROJECT } from "../projects.constants";
import { updateProject } from "../projects.services";
import { Project } from "../projects.type";

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateProjectData: Project) => {
      return updateProject(updateProjectData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_PROJECT],
      });
    },
  });
}
