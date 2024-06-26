import AddIcon from "@mui/icons-material/Add";

import { ProjectForm } from "@/domains/projects/components/ProjectForm";
import { ProjectList } from "@/domains/projects/components/ProjectList";
import { ModalForm } from "@/shared/components/ModalForm";
import { useModalHook } from "@/shared/hooks/useModalHook";

export const DashboardPage = () => {
  const { showModal, toggleModal } = useModalHook();

  return (
    <>
      <header className="py-3">
        <h1 className="title__primary">My Boards</h1>
      </header>
      <button className="flex items-center gap-1 mt-3 mb-6 btn btn__add" onClick={toggleModal}>
        <AddIcon />
        <span>Add Board</span>
      </button>
      <ProjectList />

      {/* Modal Form */}
      {showModal && (
        <ModalForm>
          <ProjectForm modalTitle="Insert New Project" onCancel={toggleModal} />
        </ModalForm>
      )}
    </>
  );
};
