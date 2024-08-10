import { delay, http, HttpResponse } from "msw";

import { DEFAULT_DELAY } from "@/mock-server/constants";

import { MOCK_PROJECTS_LIST, ProjectMother } from "./__mocks__/ProjectMother";
import { Project } from "./projects.type";

export const projectsHandlers = [
  http.get("/api/project/getAllProject", async () => {
    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      data: MOCK_PROJECTS_LIST,
    });
  }),

  http.get("/api/project/getOneProject/:projectId", async ({ params }) => {
    const { projectId } = params;
    const project = MOCK_PROJECTS_LIST.find((p) => p.id === projectId);

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

    const newProject = ProjectMother.getRandomProject(newProjectData as Project);

    await delay(DEFAULT_DELAY);
    MOCK_PROJECTS_LIST.push(newProject);

    return HttpResponse.json({
      data: newProject,
    });
  }),

  http.put("/api/project/updateProject/:projectId", async ({ params, request }) => {
    const { projectId } = params;
    const updatedProjectData = await request.json();

    const projectIndex = MOCK_PROJECTS_LIST.findIndex((p) => p.id === projectId);

    if (typeof updatedProjectData !== "object" || updatedProjectData === null) {
      return HttpResponse.json(
        {
          code: 400,
          message: "Project not found",
        },
        { status: 400 },
      );
    }

    const updatedProject = { ...MOCK_PROJECTS_LIST[projectIndex], ...updatedProjectData };
    MOCK_PROJECTS_LIST[projectIndex] = updatedProject;

    await delay(DEFAULT_DELAY);

    return HttpResponse.json({
      data: updatedProject,
    });
  }),

  http.delete("/api/project/deleteProject/:projectId", async ({ params }) => {
    const { projectId } = params;
    const projectIndex = MOCK_PROJECTS_LIST.findIndex((p) => p.id === projectId);

    if (projectIndex === -1) {
      return HttpResponse.json(
        {
          code: 400,
          message: "Project not found",
        },
        { status: 400 },
      );
    }

    MOCK_PROJECTS_LIST.splice(projectIndex, 1);

    await delay(DEFAULT_DELAY);

    return HttpResponse.json({
      message: "Project successfully deleted",
    });
  }),
];
