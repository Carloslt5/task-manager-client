import { delay, http, HttpResponse } from "msw";

import { DEFAULT_DELAY } from "@/mock-server/constants";

import { mockProjects, ProjectMother } from "./__mocks__/ProjectMother";
import { Project } from "./projects.type";

const projects = ProjectMother.getRandomList();

export const projectsHandlers = [
  http.get("/api/project/getAllProject", async () => {
    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      data: mockProjects,
    });
  }),

  http.get("/api/project/getOneProject/:projectId", async ({ params }) => {
    const { projectId } = params;
    const project = mockProjects.find((p) => p.id === projectId);

    if (!project) {
      return HttpResponse.json(
        {
          code: 400,
          message: "Project not found",
        },
        { status: 400 },
      );
    }

    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      data: project,
    });
  }),

  http.post("/api/project/createProject", async ({ request }) => {
    const newProjectData = await request.json();

    if (!newProjectData) {
      return HttpResponse.json(
        {
          code: 400,
          message: "Invalid project data received",
        },
        { status: 400 },
      );
    }

    const newProject = ProjectMother.getRandomOrder(newProjectData as Project);

    await delay(DEFAULT_DELAY);
    projects.push(newProject);

    return HttpResponse.json({
      data: projects,
    });
  }),

  http.put("/api/project/updateProject/:projectId", async ({ params, request }) => {
    const { projectId } = params;
    const updatedProjectData = await request.json();

    const projectIndex = projects.findIndex((p) => p.id === projectId);

    if (typeof updatedProjectData !== "object" || updatedProjectData === null) {
      return HttpResponse.json(
        {
          code: 400,
          message: "Project not found",
        },
        { status: 400 },
      );
    }

    const updatedProject = { ...projects[projectIndex], ...updatedProjectData };
    projects[projectIndex] = updatedProject;

    await delay(DEFAULT_DELAY);

    return HttpResponse.json({
      data: updatedProject,
    });
  }),
];
