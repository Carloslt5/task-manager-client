import axios, { AxiosResponse } from "axios";

import { getEndpoint } from "@/app/api";

import { Project } from "./projects.type";

export function fetchProjects() {
  return axios.get<AxiosResponse<Project[]>>(getEndpoint() + "/project/getAllProject").then((res) => res.data);
}
