import { useProject } from "./useProject.hook";

export const useProjectControllers = (projectId: string) => {
  const { data: project, isFetching, isError } = useProject(projectId);

  return { project, isFetching, isError };
};
