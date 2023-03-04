// reference from canpass.me
import { useEffect, useRef } from "react";

function useOuterClick(handler) {
  const ref = useRef();
  useEffect(() => {
    const listener = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        // Clicking on the ref's element or descendent elements
        handler(event);
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener); // For mobile behaviour

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
  return ref;
}

export default useOuterClick;
