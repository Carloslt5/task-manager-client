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
];
