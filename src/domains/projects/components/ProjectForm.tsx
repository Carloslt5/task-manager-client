import { useForm } from "react-hook-form";

import { useProjectsControllers } from "../hooks/useProjectsControllers";
import { Project } from "../projects.type";

interface Props {
  readonly modalTitle: string;
  readonly onCancel: () => void;
}

export const ProjectForm = ({ modalTitle, onCancel }: Props) => {
  const { handleProjectCreate } = useProjectsControllers();

  const projectForm = useForm<Partial<Project>>({
    defaultValues: {
      title: "",
    },
  });

  const { register, handleSubmit } = projectForm;

  const submitHandler = async (newProjectData: Partial<Project>) => {
    handleProjectCreate(newProjectData);
    onCancel();
  };

  return (
    <div className="modal__form">
      <div className="flex justify-between">
        <h1 className="text-2xl text-white ">{modalTitle}</h1>
      </div>
      <hr className="my-4" />
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(submitHandler)}>
        <input
          autoFocus
          className="mb-4 input__standard text-slate-700 dark:text-zinc-700"
          type="text"
          placeholder="Insert title..."
          {...register("title")}
          required
        />
        <div className="flex flex-row-reverse items-center gap-2 items-strech">
          <button className="flex items-center btn btn__add">
            <span>Add Project</span>
          </button>
          <button className="btn btn__cancel" onClick={onCancel}>
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  );
};
