import { useMemo } from "react";

import { EachTodo } from "./EachTodo";
import { useTodosContollers } from "../hooks/useTodosContollers";
import { sortByTitle } from "../utils/sortTodos";

type Props = {
  ticketId: string;
};

export const TodosList: React.FC<Props> = ({ ticketId }) => {
  const { todos, isLoadingTodos, isErrorTodos, handleUpdateTodos, handleDeleteTodo } = useTodosContollers(ticketId);

  const sortedTodos = useMemo(() => {
    return todos?.data.sort(sortByTitle);
  }, [todos?.data]);

  const renderTodoList = useMemo(() => {
    if (isLoadingTodos) {
      return <h1 className="text-white">Loading...</h1>;
    }
    if (todos?.data.length === 0) {
      return <p className="p-1 rounded-sm bg-slate-600 dark:bg-zinc-700 dark:text-white">No pending todos 👍</p>;
    }
    if (isErrorTodos) {
      return <h1>Not found ticket details...</h1>;
    }
    return (
      <ul className="flex flex-col gap-1 overflow-scroll">
        {sortedTodos?.map((todo) => (
          <li key={todo.id}>
            <EachTodo todo={todo} handleUpdateTodos={handleUpdateTodos} handleDeleteTodo={handleDeleteTodo} />
          </li>
        ))}
      </ul>
    );
  }, [isLoadingTodos, todos?.data.length, isErrorTodos, sortedTodos, handleUpdateTodos, handleDeleteTodo]);

  return (
    <article className="flex flex-col w-full p-2 overflow-y-scroll text-white rounded bg-blue-chill-400 dark:bg-zinc-800">
      <ul className="flex flex-col gap-1 overflow-scroll">{renderTodoList}</ul>
    </article>
  );
};
