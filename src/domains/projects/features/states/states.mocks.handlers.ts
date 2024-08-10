import { delay, http, HttpResponse } from "msw";

import { DEFAULT_DELAY } from "@/mock-server/constants";

import { State } from "./states.type";
import { MOCK_STATES_LIST } from "../../__mocks__/MockData";
import { StateMother } from "../../__mocks__/StatesMother";

export const statesHandlers = [
  http.get(`/api/state/getState/:projectId`, async ({ params }) => {
    const { projectId } = params;

    const states = [];
    for (const state of MOCK_STATES_LIST) {
      if (state.projectId === projectId) {
        states.push(state);
      }
    }

    if (states.length === 0) {
      return HttpResponse.json(
        {
          code: 404,
          message: "No states found for this project",
        },
        { status: 404 },
      );
    }

    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      data: states,
    });
  }),

  http.post(`/api/state/createState/:projectId`, async ({ params, request }) => {
    const { projectId } = params;

    const requestBody = await request.json();
    const newStateData: Partial<State> = requestBody as Partial<State>;

    const newState = StateMother.getRandomState(projectId as string, newStateData);
    MOCK_STATES_LIST.push(newState);

    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      data: "Stated created",
    });
  }),

  http.post(`/api/state/editState`, async ({ request }) => {
    const requestBody = await request.json();
    const { id: stateId, stateName }: Partial<State> = requestBody as Partial<State>;

    const stateIndex = MOCK_STATES_LIST.findIndex((state) => state.id === stateId);
    if (stateIndex === -1) {
      return HttpResponse.json(
        {
          code: 404,
          message: "State not found",
        },
        { status: 404 },
      );
    }

    MOCK_STATES_LIST[stateIndex] = { ...MOCK_STATES_LIST[stateIndex], stateName: stateName ?? "" };

    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      message: "State updated",
    });
  }),

  http.delete(`/api/state/deleteState/:stateId`, async ({ params }) => {
    const { stateId } = params;

    const stateIndex = MOCK_STATES_LIST.findIndex((state) => state.id === stateId);
    if (stateIndex === -1) {
      return HttpResponse.json(
        {
          code: 404,
          message: "State not found",
        },
        { status: 404 },
      );
    }

    MOCK_STATES_LIST.splice(stateIndex, 1);

    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      message: "State successfully deleted",
    });
  }),
];
