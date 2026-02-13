import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";

import { ChangeTitle } from "@/shared/components/ChangeTitle";

import { Todo } from "../todos.types";

interface Props {
  readonly todo: Todo;
  readonly handleUpdateTodos: (newTodoData: Todo) => void;
  readonly handleDeleteTodo: (todoId: string) => void;
}

export const EachTodo: React.FC<Props> = ({
  todo,
  handleUpdateTodos,
  handleDeleteTodo,
}) => {
  const { completed, ...restTodoData } = todo;

  const toggleCompleted = () => {
    handleUpdateTodos({
      ...restTodoData,
      completed: !completed,
    });
  };

  return (
    <article className="flex items-center justify-between gap-2 p-2 rounded-sm bg-blue-chill-300 dark:bg-zinc-700 dark:text-white">
      <div className="flex items-center w-full gap-2">
        <button
          className={`rounded-full h-6 w-6 p-1 aspect-square flex flex-nowrap border bg-slate-200 dark:bg-zinc-900 ${completed && "border flex justify-center items-center bg-linear-to-b from-emerald-200 from-10% to-emerald-500 to-90% dark:from-emerald-600 dark:from-10% dark:to-emerald-400 dark:to-90% cursor-pointer"}`}
          onClick={toggleCompleted}
        >
          {completed && <CheckIcon />}
        </button>
        <article className={`${completed && "line-through"} w-full`}>
          <ChangeTitle data={todo} updateData={handleUpdateTodos} />
        </article>
      </div>
      <div className="flex gap-2 cursor-pointer">
        <button
          className="p-1 font-bold bg-red-500 rounded-sm hover:bg-red-700"
          onClick={() => handleDeleteTodo(todo.id)}
        >
          <DeleteForeverIcon />
        </button>
      </div>
    </article>
  );
};
