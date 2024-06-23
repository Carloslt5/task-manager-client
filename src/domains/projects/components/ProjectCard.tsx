import { Project } from "../projects.type";

export const ProjectCard = ({ title, description }: Project) => {
  return (
    <article className="card__primary">
      <h2 className="text-xl">{title}</h2>
      <hr className="my-3 bg-blue-chill-300 border-blue-chill-200" />
      <p className="text-sm">{description}</p>
    </article>
  );
};
