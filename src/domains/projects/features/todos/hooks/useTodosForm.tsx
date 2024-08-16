import { useForm } from "react-hook-form";

import { useTodosContollers } from "./useTodosContollers";
import { Todo } from "../todos.types";

type Props = {
  readonly ticketId: string;
};

export const useTodosForm = ({ ticketId }: Props) => {
  const { handleCreateTodos } = useTodosContollers(ticketId!);

  const { register, handleSubmit, reset } = useForm<Todo>({
    defaultValues: {
      title: "",
      completed: false,
      ticketId: ticketId,
    },
  });

  const submitHandler = (data: Todo) => {
    handleCreateTodos(data);
    reset();
  };

  return { register, handleSubmit, submitHandler };
};
