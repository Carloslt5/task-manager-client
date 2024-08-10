import axios, { AxiosResponse } from "axios";

import { getEndpoint } from "@/app/api";

import { State } from "./states.type";

export function fetchStatesInProject(projectId: string) {
  return axios.get<AxiosResponse<State[]>>(getEndpoint() + `/state/getState/${projectId}`).then((res) => res.data);
}

export function createStateInProject(projectId: string, newStateData: Partial<State>) {
  return axios
    .post<AxiosResponse<State>>(getEndpoint() + `/state/createState/${projectId}`, newStateData)
    .then((res) => res.data);
}

export function updateStateInProject(newStateData: Partial<State>) {
  return axios.post<AxiosResponse<State>>(getEndpoint() + `/state/editState`, newStateData).then((res) => res.data);
}

export function deleteStateInProject(stateId: string) {
  return axios.delete<AxiosResponse<void>>(`${getEndpoint()}/state/deleteState/${stateId}`).then((res) => res.data);
}
