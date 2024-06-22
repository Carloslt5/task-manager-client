import { setupWorker } from "msw/browser";

import { getAllMockHandlers } from "@/app/module-orquestator/modules.helpers";

export const worker = setupWorker(...getAllMockHandlers());
