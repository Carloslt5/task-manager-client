import AddIcon from "@mui/icons-material/Add";

import { ProjectForm } from "@/domains/projects/components/ProjectForm";
import { ProjectList } from "@/domains/projects/components/ProjectList";
import { ActionButton } from "@/shared/components/ActionButton";
import { ModalForm } from "@/shared/components/ModalForm";
import { useModalHook } from "@/shared/hooks/useModalHook";

export const DashboardPage = () => {
  const { showModal, toggleModal } = useModalHook();

  return (
    <>
      <header className="py-3">
        <h1 className="title__primary">My Boards</h1>
      </header>
      <ActionButton icon={<AddIcon />} ctaText="Add Project" onClick={toggleModal} />

      <ProjectList />

      {showModal && (
        <ModalForm>
          <ProjectForm modalTitle="Insert New Project" onCancel={toggleModal} />
        </ModalForm>
      )}
    </>
  );
};
