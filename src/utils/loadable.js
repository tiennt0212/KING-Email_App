import { lazy } from "react";

const loadable = (importFunc) => lazy(importFunc);

export default loadable;
