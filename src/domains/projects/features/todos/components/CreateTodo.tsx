import React from "react";

import { useTodosForm } from "../hooks/useTodosForm";

type Props = {
  readonly ticketId: string;
};

export const CreateTodo: React.FC<Props> = ({ ticketId }) => {
  const { register, handleSubmit, submitHandler } = useTodosForm({ ticketId });

  return (
    <form className="flex flex-col gap-3 my-2 md:flex-row" onSubmit={handleSubmit(submitHandler)}>
      <input
        className="input__standard text-slate-700 dark:text-zinc-800"
        type="text"
        placeholder="Insert Task..."
        {...register("title")}
      />
      <button className="btn btn__add" type="submit">
        Add
      </button>
    </form>
  );
};
