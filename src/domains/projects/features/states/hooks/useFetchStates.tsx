import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY_STATES } from "../states.constants";
import { fetchStatesInProject } from "../states.services";

export const useFetchStates = (projectId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_STATES, projectId],
    queryFn: () => fetchStatesInProject(projectId),
    enabled: !!projectId,
  });
};
