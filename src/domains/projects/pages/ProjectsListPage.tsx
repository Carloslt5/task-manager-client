import AddIcon from "@mui/icons-material/Add";

import { ProjectForm } from "@/domains/projects/components/ProjectForm";
import { ProjectList } from "@/domains/projects/components/ProjectList";
import { ActionButton } from "@/shared/components/ActionButton";
import { PageTitle } from "@/shared/components/PageTitle";
import { useModalHook } from "@/shared/hooks/useModalHook";

export const ProjectsListPage = () => {
  const { modalProps, openModal } = useModalHook();

  return (
    <>
      <header className="py-3">
        <PageTitle>My Boards</PageTitle>
      </header>
      <ActionButton
        icon={<AddIcon />}
        ctaText="Add Project"
        onClick={openModal}
      />

      <ProjectList />

      {modalProps.open && (
        <ProjectForm modalTitle="Insert New Project" {...modalProps} />
      )}
    </>
  );
};
