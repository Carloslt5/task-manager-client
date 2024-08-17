import axios, { AxiosResponse } from "axios";

import { getEndpoint } from "@/app/api";

import { Ticket } from "./tickets.type";

export function fetchTickets(projectId: string) {
  return axios.get<AxiosResponse<Ticket[]>>(getEndpoint() + `/ticket/getTicket/${projectId}`).then((res) => res.data);
}

export function fetchTicketDetails(ticketId: string) {
  return axios
    .get<AxiosResponse<Ticket>>(getEndpoint() + `/ticket/getTicketDetails/${ticketId}`)
    .then((res) => res.data);
}

export function createTicket(projectId: string, ticket: Ticket) {
  return axios
    .post<AxiosResponse<Ticket>>(getEndpoint() + `/ticket/create/${projectId}`, ticket)
    .then((res) => res.data);
}

export function updateTickets(newTicketsData: Partial<Ticket>) {
  return axios
    .post<Ticket>(getEndpoint() + `/ticket/updateTicketDetails/${newTicketsData.id}`, newTicketsData)
    .then((res) => res.data);
}
