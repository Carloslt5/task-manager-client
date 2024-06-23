import { useCallback } from "react";

import { useProjectCreate } from "./useProjectCreate.hook";
import { useProjects } from "./useProjects.hook";
import { Project } from "../projects.type";

export const useProjectsControllers = () => {
  const { data: projects, isLoading } = useProjects();
  const addProjectMutation = useProjectCreate();

  const handleProjectCreate = useCallback(
    (newProjectData: Partial<Project>) => {
      addProjectMutation.mutate(newProjectData);
    },
    [addProjectMutation],
  );

  return { projects, isLoading, handleProjectCreate };
};
