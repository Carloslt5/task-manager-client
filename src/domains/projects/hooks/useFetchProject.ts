import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY_PROJECT } from "../projects.constants";
import { fetchOneProject } from "../projects.services";

export const useFetchProject = (projectId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_PROJECT, projectId],
    queryFn: () => fetchOneProject(projectId),
    enabled: !!projectId,
  });
};
