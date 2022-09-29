import { useRef, useEffect } from "react";

const UseIsMountedRef = () => {
  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  return isMounted;
};

export default UseIsMountedRef;
