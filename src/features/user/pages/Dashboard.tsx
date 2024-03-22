import { useProjects } from '@/features/project/hooks/useProjects';
import { ProjectList } from '@/features/project/pages/ProjectList';
import { useAuthStore } from '@/store/authStore';

export const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const { projects, error, isLoading, isError } = useProjects(user?.id);

  if (isLoading) return <ProjectSkeleton />;
  if (isError) return <h1>Error: {error?.message}</h1>;

  return (
    <>
      <header>
        <h1 className="mb-3 title__primary">My Dashboard</h1>
      </header>
      {projects && projects.length === 0 ? (
        <h2>No projects available.</h2>
      ) : (
        <ProjectList projects={projects} />
      )}
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
        <div className="bg-gray-200 rounded h-36" key={index}></div>
      ))}
    </section>
  </>
);
