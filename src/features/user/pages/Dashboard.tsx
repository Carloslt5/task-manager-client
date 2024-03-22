import { ProjectCard } from '@/features/project/components/ProjectCard';
import { useProject } from '@/features/project/hooks/useProject';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const { data, error, isLoading, isError } = useProject();

  if (isLoading) return <ProjectSkeleton />;
  if (isError) return <h1>Error: {error?.message}</h1>;
  return (
    <>
      <header>
        <h1 className="mb-3 title__primary">My Dashboard</h1>
      </header>
      <section className="grid w-full gap-2 mb-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-h-[500px] overflow-y-auto">
        {data &&
          data?.map((project) => (
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
      <div className="w-3/4 h-12 mb-3 bg-gray-200 rounded"></div>
    </header>
    <section className="grid w-full gap-2 mb-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-h-[500px] overflow-y-auto animate-pulse">
      {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
        <div className="h-20 bg-gray-200 rounded" key={index}></div>
      ))}
    </section>
  </>
);
