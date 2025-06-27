import { registerModule } from "@/app/module-orquestator/modules.helpers";

import { MODULE_TODOS } from "./todos.constants";
import { todosHandlers } from "./todos.mocks.handlers";

registerModule({
  name: MODULE_TODOS,
  mockHandlers: todosHandlers,
});
