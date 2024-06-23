import { Project } from "../projects.type";

export const ProjectCard = ({ title }: Project) => {
  return (
    <article className="card__primary">
      <h2 className="text-xl">{title}</h2>
    </article>
  );
};
