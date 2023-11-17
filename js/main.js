import { doApi } from "./function.js";
import { events } from "./function.js"

const init = () => {
  doApi("israel");
  events(doApi);
}

init();