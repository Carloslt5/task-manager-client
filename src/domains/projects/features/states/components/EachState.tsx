import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useEditing } from "@/shared/hooks/useEditingHook";
import { useModalHook } from "@/shared/hooks/useModalHook";

import { useStateForm } from "../hooks/useStateForm";
import { State } from "../states.type";

type Props = {
  readonly state: State;
};

const EachState = ({ state }: Props) => {
  const { isEditing, handlerEditClick } = useEditing();
  const { toggleModal } = useModalHook();

  const { handleSubmit, submitHandler, register } = useStateForm(state);

  const { stateName } = state;

  return (
    <>
      <div className="flex items-center justify-between gap-2 ">
        {!isEditing ? (
          <h2 className="w-full px-1 font-bold 2xl" onClick={handlerEditClick}>
            {stateName}
          </h2>
        ) : (
          <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
            <input
              autoFocus
              type="text"
              className="w-full px-1 text-gray-900 rounded outline-none bg-gray-50 dark:focus:ring-2 dark:focus:ring-teal-500 focus:ring-2 focus:ring-blue-500"
              placeholder={stateName}
              {...register("stateName")}
              onBlur={handlerEditClick}
              required
            />
          </form>
        )}

        <button onClick={toggleModal} className="hover:text-red-500 ">
          <DeleteForeverIcon fontSize="small" />
        </button>
      </div>
      <hr />
    </>
  );
};

export default EachState;
