import { ProjectCard } from '@/features/project/components/ProjectCard';
import projectservices from '@/services/project.services';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const [projectData, setProjectData] = useState<Project[]>([]);

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    const { data } = await projectservices.getProject();
    setProjectData(data.data);
  };

  if (!projectData) return <h1>Loading...</h1>;

  return (
    <>
      <p>Esto es el store USERID, {user?.id}</p>

      <header>
        <h1 className="mb-3 title__primary">My Dashboard</h1>
      </header>

      <section className="grid w-full gap-2 mb-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-h-[500px] overflow-y-auto">
        {projectData?.length > 0 &&
          projectData.map((project) => (
            <Link to={`/project/${project.id}`} key={project.id}>
              <ProjectCard {...project} />
            </Link>
          ))}
      </section>
    </>
  );
};
