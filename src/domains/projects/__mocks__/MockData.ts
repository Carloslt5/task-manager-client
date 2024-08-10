import { ProjectMother } from "./ProjectMother";
import { StateMother } from "./StatesMother";
import { TicketMother } from "./TicketsMother";

const projects = ProjectMother.getRandomList();
const states = projects.flatMap((project) => StateMother.getRandomList(project.id, 5));
const tickets = states.flatMap((state) => TicketMother.getRandomList(state.id, state.projectId, 10));

export const MOCK_PROJECTS_LIST = projects;
export const MOCK_STATES_LIST = states;
export const MOCK_TICKETS_LIST = tickets;
