import { useCallback } from "react";

import { EditContent } from "@/shared/components/ChangeTitle";

import { useProject } from "./useProject";
import { useProjectCreate } from "./useProjectCreate";
import { useProjects } from "./useProjects";
import { useProjectUpdate } from "./useProjectUpdate";
import { Project } from "../projects.type";

export const useProjectsControllers = (projectId?: string) => {
  // Proyect List
  const { data: projects, isLoading: isLoadingProjects, isError: isErrorProjects } = useProjects();

  // One Proyect
  const { data: project, isLoading: isLoadingProject, isError: isErrorProject } = useProject(projectId!);

  // Add one project
  const addProjectMutation = useProjectCreate();
  const handleProjectCreate = useCallback(
    (newProjectData: Partial<Project>) => {
      addProjectMutation.mutate(newProjectData);
    },
    [addProjectMutation],
  );

  // Update one project
  const projectUpdateMutation = useProjectUpdate();
  const handleProjectUpdate = useCallback(
    (updateData: EditContent) => {
      projectUpdateMutation.mutate(updateData);
    },
    [projectUpdateMutation],
  );

  return {
    projects,
    project,
    isLoading: isLoadingProjects || isLoadingProject,
    isError: isErrorProjects || isErrorProject,
    handleProjectCreate,
    handleProjectUpdate,
  };
};
