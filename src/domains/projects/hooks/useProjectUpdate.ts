import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EditContent } from "@/shared/components/ChangeTitle";

import { QUERY_KEY_PROJECT } from "../projects.constants";
import { updateProject } from "../projects.services";

export function useProjectUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateData: EditContent) => {
      return updateProject(updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_PROJECT],
      });
    },
  });
}
