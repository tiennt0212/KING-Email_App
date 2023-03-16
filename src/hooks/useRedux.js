import {
  useSelector,
  useDispatch as useReduxDispatch,
  useStore as useReduxStore,
} from "react-redux";

const useDispatch = (selector) => selector(useReduxDispatch());

const useStore = (mapSelectors) => {
  const { select } = useReduxStore();
  return useSelector(select(mapSelectors));
};

export { useSelector, useDispatch, useStore };
