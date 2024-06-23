import { Link } from "react-router-dom";

import { ProjectCard } from "./ProjectCard";
import { useProjectsControllers } from "../hooks/useProjectsControllers";

export const ProjectList = () => {
  const { projects, isFetching } = useProjectsControllers();

  if (isFetching) {
    return <h1>Loading</h1>;
  }

  return (
    <section className="grid w-full gap-2 overflow-y-auto lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      {projects?.data.map((project) => (
        <Link to={`/admin/dashboard/${project.id}`} key={project.id}>
          <ProjectCard {...project} />
        </Link>
      ))}
    </section>
  );
};
