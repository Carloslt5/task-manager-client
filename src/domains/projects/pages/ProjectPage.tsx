import { useParams } from "react-router-dom";

import { ChangeTitle } from "@/shared/components/ChangeTitle";

import { useProjectsControllers } from "../hooks/useProjectsControllers";

export const ProjectPage = () => {
  const { id: projectId } = useParams();
  const { project, isLoading, isError, handleProjectUpdate } = useProjectsControllers(projectId!);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!project || isError) {
    return <h1>Producto no encontrado</h1>;
  }

  return (
    <>
      <header className="flex items-stretch justify-between gap-2 pb-3">
        <ChangeTitle data={project?.data} variant="title-page" updateData={handleProjectUpdate} />
        {/* <SettingModal textData="Delete Project" deleteEntity={handleDelete} /> */}
      </header>
      <h1>{project?.data.title}</h1>
      <p>Owner: {project?.data.ownerId}</p>
    </>
  );
};
