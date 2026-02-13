import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { ModalContent } from "@/shared/components/ModalContent";
import { ModalForm } from "@/shared/components/ModalForm";

import { useProjectsControllers } from "../hooks/useProjectsControllers";
import { Project } from "../projects.type";

interface Props {
  readonly modalTitle: string;
  readonly open: boolean;
  readonly onClose: () => void;
}

export const ProjectForm = ({ modalTitle, onClose }: Props) => {
  const { handleProjectCreate } = useProjectsControllers();

  const projectForm = useForm<Project>({
    defaultValues: {
      title: "",
    },
  });

  const { register, handleSubmit } = projectForm;

  const submitHandler: SubmitHandler<Project> = async (newProjectData) => {
    handleProjectCreate(newProjectData);
    onClose();
  };

  return (
    <ModalForm onClose={onClose}>
      <ModalContent>
        <div className="flex justify-between">
          <h1 className="text-2xl text-white ">{modalTitle}</h1>
        </div>
        <hr className="my-4" />
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(submitHandler)}
        >
          <Input
            autoFocus
            variant="form"
            className="mb-4"
            type="text"
            placeholder="Insert title..."
            {...register("title")}
            required
          />
          <div className="flex flex-row-reverse items-center gap-2 items-strech">
            <Button variant="add">
              <span>Add Project</span>
            </Button>
            <Button variant="cancel" onClick={onClose}>
              <span>Cancel</span>
            </Button>
          </div>
        </form>
      </ModalContent>
    </ModalForm>
  );
};
