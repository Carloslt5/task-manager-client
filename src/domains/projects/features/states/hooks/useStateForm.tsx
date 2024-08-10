import { useForm } from "react-hook-form";

import { useStateControllers } from "./useStateControllers";
import { State } from "../states.type";

type UseStateFormProps = {
  state?: State;
  projectId: string;
  onClose: () => void;
};

export const useStateForm = ({ state, projectId, onClose }: UseStateFormProps) => {
  const { handleStatesCreate, handleUpdateStates } = useStateControllers(projectId!);

  const { register, handleSubmit, reset } = useForm<State>({
    defaultValues: state || { stateName: "" },
  });

  const submitHandler = (data: State) => {
    if (state) {
      handleUpdateStates(data);
    } else {
      handleStatesCreate(data);
    }
    reset();
    onClose();
  };

  return { register, handleSubmit, submitHandler };
};
