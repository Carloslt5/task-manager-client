import { delay, http, HttpResponse } from "msw";

import { UserMother } from "./__mocks__/UserMother";

const userData = UserMother.getMockUser();

export const handlers = [
  http.get("/api/auth/login", async () => {
    await delay(500);
    return HttpResponse.json({
      data: userData,
    });
  }),
];
