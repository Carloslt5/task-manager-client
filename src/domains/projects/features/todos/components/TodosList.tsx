import { useMemo } from "react";

import { useTodosContollers } from "../hooks/useTodosContollers";
import { EachTodo } from "./EachTodo";

type Props = {
  ticketId: string;
};

export const TodosList: React.FC<Props> = ({ ticketId }) => {
  const {
    todos,
    isLoadingTodos,
    isErrorTodos,
    handleUpdateTodos,
    handleDeleteTodo,
  } = useTodosContollers(ticketId);

  const renderTodoList = useMemo(() => {
    if (isLoadingTodos) {
      return <h1 className="text-white">Loading...</h1>;
    }
    if ((todos?.data ?? []).length === 0) {
      return (
        <p className="p-1 rounded-xs bg-slate-600 dark:bg-zinc-700 dark:text-white">
          No pending todos 👍
        </p>
      );
    }
    if (isErrorTodos) {
      return <h1>Not found ticket details...</h1>;
    }
    return (
      <ul className="flex flex-col gap-1 overflow-scroll">
        {todos?.data?.map((todo) => (
          <li key={todo.id}>
            <EachTodo
              todo={todo}
              handleUpdateTodos={handleUpdateTodos}
              handleDeleteTodo={handleDeleteTodo}
            />
          </li>
        ))}
      </ul>
    );
  }, [
    isLoadingTodos,
    todos?.data,
    isErrorTodos,
    handleUpdateTodos,
    handleDeleteTodo,
  ]);

  return (
    <article className="flex flex-col w-full mt-2 mb-6 overflow-y-scroll text-white rounded-sm  max-h-[550px] ">
      {renderTodoList}
    </article>
  );
};
