import { type RefObject, useLayoutEffect, useState } from "react";

export const useIsOverflow = (
  ref: RefObject<HTMLElement>,
  callback?: (isOverflowing: boolean) => void,
) => {
  const [isOverflow, setIsOverflow] = useState<boolean>(false);

  useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflow =
        (current?.scrollWidth ?? 0) > (current?.clientWidth ?? 0);

      setIsOverflow(hasOverflow);

      if (callback) callback(hasOverflow);
    };

    if (current) {
      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};
