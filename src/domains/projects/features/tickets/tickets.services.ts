import axios, { AxiosResponse } from "axios";

import { getEndpoint } from "@/app/api";

import { Ticket } from "./tickets.type";

export function fetchTickets(projectId: string) {
  return axios.get<AxiosResponse<Ticket[]>>(getEndpoint() + `/ticket/getTicket/${projectId}`).then((res) => res.data);
}
