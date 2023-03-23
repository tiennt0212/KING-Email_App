import { init } from "@rematch/core";
import selectPlugin from "@rematch/select";
import loadingPlugin from "@rematch/loading";
import * as models from "./models";

const store = init({ models, plugins: [selectPlugin(), loadingPlugin()] });

export default store;
