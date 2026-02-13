import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";

import { ActionButton } from "@/shared/components/ActionButton";
import { ChangeTitle } from "@/shared/components/ChangeTitle";
import SettingModal from "@/shared/components/SettingModal";
import { useModalHook } from "@/shared/hooks/useModalHook";

import { CreateStateModal } from "../features/states/components/CreateStateModal";
import { StatesContainer } from "../features/states/components/StatesContainer";
import { useProjectsControllers } from "../hooks/useProjectsControllers";

export const ProjectPage = () => {
  const { id: projectId } = useParams();
  const { modalProps, openModal } = useModalHook();

  const {
    project,
    isLoading,
    isError,
    handleProjectUpdate,
    handleProjectDelete,
  } = useProjectsControllers(projectId!);

  if (!isLoading && (!project || isError)) {
    return <h1>Producto no encontrado</h1>;
  }

  return (
    <>
      <header className="flex items-stretch justify-between gap-2 pb-3">
        {isLoading ? (
          <div className="h-10 w-64 rounded-sm animate-pulse bg-primary-400/30 dark:bg-neutral-800" />
        ) : (
          <>
            <ChangeTitle
              data={project!.data}
              variant="title-page"
              updateData={handleProjectUpdate}
            />
            <SettingModal
              textData="Delete Project"
              deleteEntity={() => handleProjectDelete(projectId!)}
            />
          </>
        )}
      </header>
      <ActionButton
        icon={<AddIcon />}
        ctaText="Add State"
        onClick={openModal}
      />

      <StatesContainer />

      {modalProps.open && (
        <CreateStateModal modalTitle="Insert New State" {...modalProps} />
      )}
    </>
  );
};
