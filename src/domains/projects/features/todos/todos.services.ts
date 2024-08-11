import axios, { AxiosResponse } from "axios";

import { getEndpoint } from "@/app/api";
import { EditContent } from "@/shared/components/ChangeTitle";

import { Todo } from "./todos.types";

export function fetchTodos(ticketId: string) {
  return axios.get<AxiosResponse<Todo[]>>(getEndpoint() + `/todos/getTodos/${ticketId}`).then((res) => res.data);
}

export function updateTodos(todoId: string, updatedTodo: EditContent) {
  return axios
    .post<AxiosResponse<Todo>>(getEndpoint() + `/todos/updateTodo/${todoId}`, updatedTodo)
    .then((res) => res.data);
}
