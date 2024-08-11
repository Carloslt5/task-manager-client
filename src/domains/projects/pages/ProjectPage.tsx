import { useParams } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import { ActionButton } from "@/shared/components/ActionButton";
import { ChangeTitle } from "@/shared/components/ChangeTitle";
import { ModalForm } from "@/shared/components/ModalForm";
import SettingModal from "@/shared/components/SettingModal";
import { useModalHook } from "@/shared/hooks/useModalHook";

import { CreateStateModal } from "../features/states/components/CreateStateModal";
import { StatesContainer } from "../features/states/components/StatesContainer";
import { useProjectsControllers } from "../hooks/useProjectsControllers";

export const ProjectPage = () => {
  const { id: projectId } = useParams();
  const { modalProps, openModal } = useModalHook();

  const { project, isLoading, isError, handleProjectUpdate, handleProjectDelete } = useProjectsControllers(projectId!);

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
        <SettingModal textData="Delete Project" deleteEntity={() => handleProjectDelete(projectId!)} />
      </header>
      <ActionButton icon={<AddIcon />} ctaText="Add State" onClick={openModal} />
      <p>Owner: {project?.data.ownerId}</p>

      <StatesContainer />

      {modalProps.open && (
        <ModalForm>
          <CreateStateModal modalTitle="Insert New State" {...modalProps} />
        </ModalForm>
      )}
    </>
  );
};
