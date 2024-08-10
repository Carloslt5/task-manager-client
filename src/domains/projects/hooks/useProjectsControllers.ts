import { useCallback } from "react";

import { EditContent } from "@/shared/components/ChangeTitle";

import { useCreateProject } from "./useCreateProject";
import { useDeleteProject } from "./useDeleteProject";
import { useFetchProject } from "./useFetchProject";
import { useFetchProjects } from "./useFetchProjects";
import { useUpdateProject } from "./useUpdateProject";
import { Project } from "../projects.type";

export const useProjectsControllers = (projectId?: string) => {
  // Proyect List
  const { data: projects, isLoading: isLoadingProjects, isError: isErrorProjects } = useFetchProjects();

  // One Proyect
  const { data: project, isLoading: isLoadingProject, isError: isErrorProject } = useFetchProject(projectId!);

  // Add one project
  const addProjectMutation = useCreateProject();
  const handleProjectCreate = useCallback(
    (newProjectData: Partial<Project>) => {
      addProjectMutation.mutate(newProjectData);
    },
    [addProjectMutation],
  );

  // Update one project
  const updateProjecteMutation = useUpdateProject();
  const handleProjectUpdate = useCallback(
    (updateData: EditContent) => {
      updateProjecteMutation.mutate(updateData);
    },
    [updateProjecteMutation],
  );

  //Delete one project
  const deleteProjectMutation = useDeleteProject();
  const handleProjectDelete = useCallback(
    (projectId: string) => {
      deleteProjectMutation.mutate(projectId);
    },
    [deleteProjectMutation],
  );

  return {
    projects,
    project,
    isLoading: isLoadingProjects || isLoadingProject,
    isError: isErrorProjects || isErrorProject,
    handleProjectCreate,
    handleProjectUpdate,
    handleProjectDelete,
  };
};
