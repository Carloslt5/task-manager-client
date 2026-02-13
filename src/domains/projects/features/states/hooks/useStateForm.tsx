import { useForm } from "react-hook-form";

import { State } from "../states.type";
import { useStatesControllers } from "./useStatesControllers";

type UseStateFormProps = {
  state?: State;
  projectId: string;
  onClose: () => void;
};

export const useStateForm = ({
  state,
  projectId,
  onClose,
}: UseStateFormProps) => {
  const { handleCreateStates, handleUpdateStates } = useStatesControllers(
    projectId!,
  );

  const { register, handleSubmit, reset } = useForm<State>({
    defaultValues: state || { stateName: "" },
  });

  const submitHandler = (data: State) => {
    if (state) {
      handleUpdateStates(data);
    } else {
      handleCreateStates(data);
    }
    reset();
    onClose();
  };

  return { register, handleSubmit, submitHandler };
};
