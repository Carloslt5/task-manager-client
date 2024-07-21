/* eslint-disable no-console */

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { State } from "../states.type";

export const useStateForm = (state: State) => {
  const { id, stateName } = state;
  const { id: projectId } = useParams();

  const stateForm = useForm<State>({
    defaultValues: {
      id: id,
      stateName: stateName,
    },
  });

  const { register, handleSubmit } = stateForm;

  const submitHandler = async (stateFormData: State): Promise<void> => {
    try {
      if (projectId) {
        console.log("🚀 --------- projectId", projectId);
        console.log("🚀 --------- stateFormData", stateFormData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerDeleteStateAndTicket = async () => {
    //todo
  };

  return {
    register,
    handleSubmit,
    submitHandler,
    handlerDeleteStateAndTicket,
  };
};
