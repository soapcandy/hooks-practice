import { useEffect } from "react";
import useIntervalFn from "./useIntervalFn";

const useInterval = (fn, ms) => {
  //useIntervalFn 을 통해 사용
  const [run, clear] = useIntervalFn(fn, ms);

  useEffect(() => {
    run();
    return clear;
  }, [run, clear]);

  return clear;
};

export default useInterval;
