import { delay, http, HttpResponse } from "msw";

import { DEFAULT_DELAY } from "@/mock-server/constants";

import { State } from "./states.type";
import { MOCK_PROJECTS_LIST } from "../../__mocks__/ProjectMother";
import { StateMother } from "../../__mocks__/StatesMother";

export const statesHandlers = [
  http.post(`/api/state/createState/:projectId`, async ({ params, request }) => {
    const { projectId } = params;

    const requestBody = await request.json();
    const newStateData: Partial<State> = requestBody as Partial<State>;
    const project = MOCK_PROJECTS_LIST.find((p) => p.id === projectId);

    if (!project) {
      return HttpResponse.json(
        {
          code: 404,
          message: "Project not found",
        },
        { status: 404 },
      );
    }

    if (!newStateData.stateName || typeof newStateData.stateName !== "string") {
      return HttpResponse.json(
        {
          code: 400,
          message: "Invalid stateName",
        },
        { status: 400 },
      );
    }

    const newState: State = StateMother.getRandomState(project.id, {
      stateName: newStateData.stateName,
    });

    project.states.push(newState);

    await delay(DEFAULT_DELAY);

    return HttpResponse.json({
      data: newState,
    });
  }),

  http.post(`/api/state/editState`, async ({ request }) => {
    const requestBody = await request.json();
    const { id: stateId, stateName }: Partial<State> = requestBody as Partial<State>;

    const projectContainingState = MOCK_PROJECTS_LIST.find((project) =>
      project.states.some((state) => state.id === stateId),
    );

    if (!projectContainingState) {
      return HttpResponse.json(
        {
          code: 404,
          message: "State not found",
        },
        { status: 404 },
      );
    }

    const stateToUpdate = projectContainingState.states.find((state) => state.id === stateId);

    if (!stateToUpdate) {
      return HttpResponse.json(
        {
          code: 404,
          message: "State not found",
        },
        { status: 404 },
      );
    }

    if (stateName && typeof stateName === "string") {
      stateToUpdate.stateName = stateName;
    } else {
      return HttpResponse.json(
        {
          code: 400,
          message: "Invalid stateName",
        },
        { status: 400 },
      );
    }

    await delay(DEFAULT_DELAY);

    return HttpResponse.json({
      message: "State updated",
    });
  }),

  http.delete(`/api/state/deleteState/:stateId`, async ({ params }) => {
    const { stateId } = params;

    MOCK_PROJECTS_LIST.map((project) => {
      project.states = project.states.filter((state) => state.id !== stateId);
      return project;
    });

    await delay(DEFAULT_DELAY);

    return HttpResponse.json({
      message: "Project successfully deleted",
    });
  }),
];