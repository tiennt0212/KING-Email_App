import { init } from "@rematch/core";
import selectPlugin from "@rematch/select";
import * as models from "./models";

const store = init({ models, plugins: [selectPlugin()] });

export default store;
