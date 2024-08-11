import React from "react";

import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { ChangeTitle } from "@/shared/components/ChangeTitle";

import { Todo } from "../todos.types";

interface Props {
  readonly todo: Todo;
  readonly handleUpdateTodos: (newTodoData: Todo) => void;
}

export const EachTodo: React.FC<Props> = ({ todo, handleUpdateTodos }) => {
  const { completed } = todo;

  return (
    <article className="flex items-center justify-between gap-2 p-2 rounded bg-blue-chill-300 dark:bg-zinc-700 dark:text-white">
      <div className="flex items-center w-full gap-2">
        <button
          className={`rounded-full h-6 w-6 p-1 aspect-square flex flex-nowrap border bg-slate-200 dark:bg-zinc-900 ${completed && "border flex justify-center items-center bg-gradient-to-b from-emerald-200 from-10% to-emerald-500 to-90% cursor-pointer"}`}
        >
          {completed && <CheckIcon />}
        </button>
        <article className={`${completed && "line-through"} w-full`}>
          <ChangeTitle data={todo} updateData={handleUpdateTodos} />
        </article>
      </div>
      <div className="flex gap-2 cursor-pointer">
        <button className="p-1 font-bold bg-red-500 rounded hover:bg-red-700">
          <DeleteForeverIcon />
        </button>
      </div>
    </article>
  );
};
