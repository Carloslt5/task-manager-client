import { useProjects } from "./useProjects.hook";

export const useProjectsControllers = () => {
  const { data: projects, isFetching } = useProjects();

  return { projects, isFetching };
};
