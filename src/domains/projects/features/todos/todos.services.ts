import axios, { AxiosResponse } from "axios";

import { getEndpoint } from "@/app/api";

import { Todo } from "./todos.types";

export function fetchTodos(ticketId: string) {
  return axios.get<AxiosResponse<Todo[]>>(getEndpoint() + `/todos/getTodos/${ticketId}`).then((res) => res.data);
}

export function createTodos(newTodo: Todo) {
  return axios.post<AxiosResponse<Todo>>(getEndpoint() + `/todos/createTodos`, newTodo).then((res) => res.data);
}

export function updateTodo(todoId: string, updatedTodo: Todo) {
  return axios
    .post<AxiosResponse<Todo>>(getEndpoint() + `/todos/updateTodo/${todoId}`, updatedTodo)
    .then((res) => res.data);
}

export function deleteTodo(todoId: string) {
  return axios.delete<AxiosResponse<Todo>>(getEndpoint() + `/todos/deleteTodo/${todoId}`).then((res) => res.data);
}
