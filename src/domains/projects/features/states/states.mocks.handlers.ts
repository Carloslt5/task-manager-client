import { delay, http, HttpResponse } from "msw";

import { DEFAULT_DELAY } from "@/mock-server/constants";

import { State } from "./states.type";
import { mockProjects } from "../../__mocks__/ProjectMother";

export const statesHandlers = [
  http.post(`/api/state/createState/:projectId`, async ({ params, request }) => {
    const { projectId } = params;

    const requestBody = await request.json();
    const newStateData: Partial<State> = requestBody as Partial<State>;
    const project = mockProjects.find((p) => p.id === projectId);

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

    const newState: State = {
      id: (project.states.length + 1).toString(),
      stateName: newStateData.stateName,
      projectId: project.id,
    };
    project.states.push(newState);

    await delay(DEFAULT_DELAY);

    return HttpResponse.json({
      data: newState,
    });
  }),
];
