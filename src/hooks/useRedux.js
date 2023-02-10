import { useSelector, useDispatch as useReduxDispatch } from "react-redux";

const useDispatch = (selector) => selector(useReduxDispatch());

export { useSelector, useDispatch };
