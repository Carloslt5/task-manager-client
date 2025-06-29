import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useParams } from "react-router-dom";

import { ConfirmationModal } from "@/shared/components/ConfirmationModal";
import { useEditing } from "@/shared/hooks/useEditingHook";
import { useModalHook } from "@/shared/hooks/useModalHook";

import { useStateForm } from "../hooks/useStateForm";
import { useStatesControllers } from "../hooks/useStatesControllers";
import { State } from "../states.type";

type Props = {
  readonly state: State;
};

const EachState = ({ state }: Props) => {
  const { id: projectId } = useParams();

  const { modalProps, openModal } = useModalHook();
  const { isEditing, handlerEditClick } = useEditing();

  const { handleDeleteStates } = useStatesControllers(projectId!);

  const { register, handleSubmit, submitHandler } = useStateForm({
    state,
    projectId: projectId!,
    onClose: handlerEditClick,
  });

  const { stateName } = state;

  return (
    <>
      <div className="flex items-center justify-between gap-2 ">
        {!isEditing ? (
          <h2
            className="w-full px-1 font-bold cursor-pointer 2xl"
            onClick={handlerEditClick}
          >
            {stateName}
          </h2>
        ) : (
          <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
            <input
              autoFocus
              type="text"
              className="w-full px-1 text-gray-900 rounded-sm outline-hidden bg-gray-50 dark:focus:ring-2 dark:focus:ring-teal-500 focus:ring-2 focus:ring-blue-500"
              placeholder={stateName}
              {...register("stateName")}
              onBlur={handlerEditClick}
              required
            />
          </form>
        )}

        <button className="hover:text-red-500" onClick={openModal}>
          <DeleteForeverIcon fontSize="small" />
        </button>
      </div>

      {modalProps.open && (
        <ConfirmationModal
          message="Are you SURE you want to DELETE this STATE?"
          onConfirm={() => handleDeleteStates(state.id)}
          {...modalProps}
        />
      )}
    </>
  );
};

export default EachState;
