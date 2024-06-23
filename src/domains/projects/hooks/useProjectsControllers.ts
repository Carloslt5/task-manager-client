import { useCallback } from "react";

import { useProjectCreate } from "./useProjectCreate";
import { useProjects } from "./useProjects.hook";
import { Project } from "../projects.type";

export const useProjectsControllers = () => {
  const { data: projects, isFetching } = useProjects();
  const mutation = useProjectCreate();

  const handleProjectCreate = useCallback(
    (newProjectData: Partial<Project>) => {
      mutation.mutate(newProjectData);
    },
    [mutation],
  );

  return { projects, isFetching, handleProjectCreate };
};
