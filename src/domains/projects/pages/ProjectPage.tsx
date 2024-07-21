import { useParams } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import { ActionButton } from "@/shared/components/ActionButton";
import { ChangeTitle } from "@/shared/components/ChangeTitle";
import { ModalForm } from "@/shared/components/ModalForm";
import { useModalHook } from "@/shared/hooks/useModalHook";

import { ColumnState } from "../features/states/components/ColumnState";
import { CreateStateForm } from "../features/states/components/CreateStateForm";
import { useProjectsControllers } from "../hooks/useProjectsControllers";

export const ProjectPage = () => {
  const { id: projectId } = useParams();
  const { showModal, toggleModal } = useModalHook();

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
      <ActionButton icon={<AddIcon />} ctaText="Add State" onClick={toggleModal} />
      <p>Owner: {project?.data.ownerId}</p>

      <section className="h-[75%] mt-2">
        <ul className="flex flex-row items-stretch max-h-full gap-4 pb-2 mb-3 overflow-y-auto text-white">
          {project.data.states.map((state) => (
            <ColumnState key={state.id} state={state} />
          ))}
        </ul>
        <p className="mt-2 text-sm text-center text-slate-500 dark:text-zinc-500">
          Drag and Drop ticket to change status
        </p>
      </section>

      {showModal && (
        <ModalForm>
          <CreateStateForm modalTitle="Insert New State" onCancel={toggleModal} />
        </ModalForm>
      )}
    </>
  );
};
