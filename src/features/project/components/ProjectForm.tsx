import { SubmitHandler, useForm } from 'react-hook-form';
import projectservices from '../api/project.actions';

interface ProjecFormProprs {
  modalTitle: string;
  onCancel: () => void;
}

type ProjectFormData = {
  title: string;
  description: string;
};

export const ProjectForm = ({ modalTitle, onCancel }: ProjecFormProprs) => {
  const handleCancel = () => {
    onCancel();
  };

  const projectForm = useForm<ProjectFormData>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const { register, handleSubmit } = projectForm;

  const onSubmit: SubmitHandler<ProjectFormData> = async (projectData) => {
    await projectservices.createProject(projectData);
    handleCancel();
  };

  return (
    <div className="modal__form">
      <div className="flex justify-between">
        <h1 className="text-2xl text-white ">{modalTitle}</h1>
      </div>
      <hr className="mb-4" />
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <input
          autoFocus
          className="input__standard text-slate-700 dark:text-zinc-700"
          type="text"
          placeholder="Insert title..."
          {...register('title')}
          required
        />

        <textarea
          className="h-10 input__standard text-zinc-700 dark:text-zinc-700 max-h-32"
          placeholder="Insert description..."
          {...register('description')}
        />

        <div className="flex flex-row-reverse items-center gap-2 items-strech">
          <button className="flex items-center btn btn__primary">
            <span>{modalTitle}</span>
          </button>
          <button className="btn btn__cancel" onClick={handleCancel}>
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  );
};
