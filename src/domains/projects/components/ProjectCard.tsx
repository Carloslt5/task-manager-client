import { Project } from "../projects.type";

export const ProjectCard = ({ title, description }: Project) => {
  return (
    <article className="card__primary">
      <h2>{title}</h2>
      <p className="text-sm">{description}</p>
    </article>
  );
};
