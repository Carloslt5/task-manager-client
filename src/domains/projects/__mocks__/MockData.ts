import { ProjectMother } from "./ProjectMother";
import { StateMother } from "./StatesMother";
import { TicketMother } from "./TicketsMother";
import { TodoMother } from "./TodoMother";

const projects = ProjectMother.getRandomList();
const states = projects.flatMap((project) => StateMother.getRandomList(project.id, 2));
const tickets = states.flatMap((state) => TicketMother.getRandomList(state.id, state.projectId, 5));
const todos = tickets.flatMap((ticket) => TodoMother.getRandomList(ticket.id, 3));

export const MOCK_PROJECTS_LIST = projects;
export const MOCK_STATES_LIST = states;
export const MOCK_TICKETS_LIST = tickets;
export const MOCK_TODOS_LIST = todos;
