import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { QUERY_KEY_PROJECT } from "../projects.constants";
import { deleteProject } from "../projects.services";

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (projectId: string) => {
      return deleteProject(projectId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_PROJECT],
      });
      navigate("/admin/projects");
    },
  });
}
