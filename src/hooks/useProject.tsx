import projectservices from '@/services/project.services';
import { useQuery } from '@tanstack/react-query';

export const useProject = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['project'],
    queryFn: () => {
      return projectservices.getProject();
    },
  });

  return { data, error, isLoading, isError };
};
