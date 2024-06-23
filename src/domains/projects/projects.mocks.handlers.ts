import { delay, http, HttpResponse } from "msw";

import { DEFAULT_DELAY } from "@/mock-server/constants";

import { ProjectMother } from "./__mocks__/ProjectMother";

const projects = ProjectMother.getRandomList();

export const handlers = [
  http.get("/api/project/getAllProject", async () => {
    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      data: projects,
    });
  }),

  http.get("/api/project/getOneProject/:projectId", async ({ params }) => {
    const { projectId } = params;
    const project = projects.find((p) => p.id === projectId);

    if (!project) {
      return HttpResponse.json(
        {
          code: 400,
          message: "Project not found",
        },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      data: project,
    });
  }),
];
