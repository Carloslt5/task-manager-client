import { registerModule } from "@/app/module-orquestator/modules.helpers";

import { MODULE_TICKETS } from "./tickets.constants";
import { ticketsHandlers } from "./tickets.mocks.handlers";

registerModule({
  name: MODULE_TICKETS,
  mockHandlers: ticketsHandlers,
});
