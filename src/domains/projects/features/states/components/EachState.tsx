import { useParams } from "react-router-dom";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { ConfirmationModal } from "@/shared/components/ConfirmationModal";
import { ModalForm } from "@/shared/components/ModalForm";
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

  const { showModal, toggleModal } = useModalHook();
  const { isEditing, handlerEditClick } = useEditing();

  const { handleDeleteState } = useStatesControllers(projectId!);

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

        <button className="hover:text-red-500" onClick={toggleModal}>
          <DeleteForeverIcon fontSize="small" />
        </button>
      </div>

      {showModal && (
        <ModalForm>
          <ConfirmationModal
            message="Are you SURE you want to DELETE this STATE?"
            onConfirm={() => handleDeleteState(state.id)}
            onCancel={toggleModal}
          />
        </ModalForm>
      )}
    </>
  );
};

export default EachState;
