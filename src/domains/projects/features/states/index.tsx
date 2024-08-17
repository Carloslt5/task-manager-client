import { registerModule } from "@/app/module-orquestator/modules.helpers";

import { MODULE_STATES } from "./states.constants";
import { statesHandlers } from "./states.mocks.handlers";

registerModule({
  name: MODULE_STATES,
  mockHandlers: statesHandlers,
});
