import { Link } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';

type ProjectListPRops = {
  projects: Project[];
};

export const ProjectList = ({ projects }: ProjectListPRops) => {
  return (
    <section className="grid w-full gap-2 mb-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-h-[500px] overflow-y-auto">
      {projects &&
        projects?.map((project) => (
          <Link to={`/project/${project.id}`} key={project.id}>
            <ProjectCard {...project} />
          </Link>
        ))}
    </section>
  );
};
