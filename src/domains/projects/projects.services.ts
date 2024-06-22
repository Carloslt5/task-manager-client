import axios from "axios";

import { getEndpoint } from "@/app/api";

export function fetchProjects() {
  return axios.get(getEndpoint() + "/project/getAllProject").then((res) => res.data);
}
