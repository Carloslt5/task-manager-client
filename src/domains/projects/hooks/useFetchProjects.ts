import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY_PROJECTS } from "../projects.constants";
import { fetchProjects } from "../projects.services";

export const useFetchProjects = (userId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_PROJECTS, userId],
    queryFn: () => {
      return fetchProjects();
    },
  });
};
