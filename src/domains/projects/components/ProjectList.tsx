import { Link } from "react-router-dom";

import { ProjectCard } from "./ProjectCard";
import { Project } from "../projects.type";

const projects: Project[] = [
  { id: "1", title: "Project One", description: "Description of Project One" },
  { id: "2", title: "Project Two", description: "Description of Project Two" },
  { id: "3", title: "Project Three", description: "Description of Project Three" },
];

export const ProjectList = () => {
  return (
    <section className="grid w-full gap-2 mb-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-h-[500px] overflow-y-auto">
      {projects &&
        projects?.map((project) => (
          <Link to={`/admin/dashboard/${project.id}`} key={project.id}>
            <ProjectCard {...project} />
          </Link>
        ))}
    </section>
  );
};
