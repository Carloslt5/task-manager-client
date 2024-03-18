import { ProjectCard } from '@/features/project/components/ProjectCard';
import projectservices from '@/services/project.services';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const query = useQuery({
    queryKey: ['project'],
    queryFn: () => {
      return projectservices.getProject();
    },
  });

  if (query.isLoading) return <ProjectSkeleton />;
  if (query.isError) return <h1>Error: {query.error.message}</h1>;
  return (
    <>
      <header>
        <h1 className="mb-3 title__primary">My Dashboard</h1>
      </header>
      <section className="grid w-full gap-2 mb-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-h-[500px] overflow-y-auto">
        {query &&
          query.data?.map((project) => (
            <Link to={`/project/${project.id}`} key={project.id}>
              <ProjectCard {...project} />
            </Link>
          ))}
      </section>
    </>
  );
};

export const ProjectSkeleton = () => (
  <>
    <header className="animate-pulse">
      <div className="w-full h-12 mb-3 bg-gray-200 rounded"></div>
    </header>
    <section className="grid w-full gap-2 mb-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-h-[500px] overflow-y-auto animate-pulse">
      <div className="h-20 bg-gray-200 rounded"></div>
      <div className="h-20 bg-gray-200 rounded"></div>
      <div className="h-20 bg-gray-200 rounded"></div>
      <div className="h-20 bg-gray-200 rounded"></div>
    </section>
  </>
);
