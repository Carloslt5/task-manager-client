import axios, { AxiosResponse } from "axios";

import { getEndpoint } from "@/app/api";
import { EditContent } from "@/shared/components/ChangeTitle";

import { Project } from "./projects.type";

export function fetchProjects() {
  return axios.get<AxiosResponse<Project[]>>(getEndpoint() + "/project/getAllProject").then((res) => res.data);
}

export function fetchOneProject(projectId: string) {
  return axios
    .get<AxiosResponse<Project>>(getEndpoint() + `/project/getOneProject/${projectId}`)
    .then((res) => res.data);
}

export function createProject(projectData: Partial<Project>) {
  return axios
    .post<AxiosResponse<Project>>(getEndpoint() + "/project/createProject", projectData)
    .then((res) => res.data);
}

export function updateProject(editContent: EditContent) {
  return axios
    .put<AxiosResponse<Project>>(getEndpoint() + `/project/updateProject/${editContent.id}`, editContent)
    .then((res) => res.data);
}

export function deleteProject(projectId: string) {
  return axios
    .delete<AxiosResponse<Project>>(getEndpoint() + `/project/deleteProject/${projectId}`)
    .then((res) => res.data);
}
