import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY_PROJECTS } from "../projects.constants";
import { createProject } from "../projects.services";
import { Project } from "../projects.type";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProjectData: Partial<Project>) => {
      return createProject(newProjectData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_PROJECTS],
      });
    },
  });
}
