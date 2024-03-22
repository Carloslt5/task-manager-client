import projectservices from '@/features/project/api/project.actions';
import { useQuery } from '@tanstack/react-query';

export const useProjects = (userId?: string) => {
  const {
    data: projects = [],
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['projects', userId],
    queryFn: () => {
      return projectservices.getProjects();
    },
  });

  return { projects, error, isLoading, isError };
};
