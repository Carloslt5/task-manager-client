import { useParams } from "react-router-dom";

import { ChangeTitle } from "@/shared/components/ChangeTitle";

import { useProjectControllers } from "../hooks/useProjectControllers";

export const ProjectPage = () => {
  const { id: projectId } = useParams();
  const { project, isFetching, isError } = useProjectControllers(projectId!);

  if (isError || !project) {
    return <h1>Producto no encontrado</h1>;
  }

  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <header className="flex items-stretch justify-between gap-2 pb-3">
        <ChangeTitle data={project?.data} variant="title-page" />
        {/* <SettingModal textData="Delete Project" deleteEntity={handleDelete} /> */}
      </header>
      <h1>{project?.data.title}</h1>
      <p>{project?.data.description}</p>
      <p>Owner: {project?.data.ownerId}</p>
    </>
  );
};
