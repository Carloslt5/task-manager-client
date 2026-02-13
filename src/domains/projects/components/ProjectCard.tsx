import { Card } from "@/shared/components/Card";

import { Project } from "../projects.type";

export const ProjectCard = ({ title }: Project) => {
  return (
    <Card>
      <h2 className="text-xl">{title}</h2>
    </Card>
  );
};
