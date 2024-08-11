import { useParams } from "react-router-dom";

import { useStateForm } from "../hooks/useStateForm";

type Props = {
  readonly modalTitle: string;
  readonly open: boolean;
  readonly onClose: () => void;
};

export const CreateStateModal = ({ modalTitle, onClose }: Props) => {
  const { id: projectId } = useParams();

  const { register, handleSubmit, submitHandler } = useStateForm({
    projectId: projectId!,
    onClose: onClose,
  });

  return (
    <>
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
            placeholder="New State..."
            {...register("stateName", { required: "State name is required" })}
            required
          />
          <div className="flex flex-row-reverse items-center gap-2 items-strech">
            <button className="flex items-center btn btn__add">
              <span>Add State</span>
            </button>
            <button className="btn btn__cancel" onClick={onClose}>
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
