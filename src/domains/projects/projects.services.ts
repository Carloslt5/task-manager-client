import axios, { AxiosResponse } from "axios";

import { getEndpoint } from "@/app/api";

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
