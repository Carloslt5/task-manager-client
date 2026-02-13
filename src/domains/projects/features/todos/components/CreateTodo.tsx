import React from "react";

import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";

import { useTodosForm } from "../hooks/useTodosForm";

type Props = {
  readonly ticketId: string;
};

export const CreateTodo: React.FC<Props> = ({ ticketId }) => {
  const { register, handleSubmit, submitHandler } = useTodosForm({ ticketId });

  return (
    <form
      className="flex flex-col gap-3 my-2 md:flex-row"
      onSubmit={handleSubmit(submitHandler)}
    >
      <Input
        variant="form"
        type="text"
        placeholder="Insert Task..."
        {...register("title")}
      />
      <Button variant="add" type="submit">
        Add
      </Button>
    </form>
  );
};
