import { Spinner } from "@/assets/Spinner/Spinner";
import { throttle } from "@/lib/throttle";
import React, { useEffect, useRef } from "react";

export const InfiniteLoader: React.FC<{ loadFunction: () => Promise<any> }> = ({ loadFunction }) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  const throttleFunc = useRef(throttle(2000, loadFunction));
  useEffect(() => {
    // use Observable
    // use IntersectionObserver
    // use scroll event
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio <= 0) return;
      // load more content;
      throttleFunc.current();
    });
    // start observing
    if (divRef.current) {
      intersectionObserver.observe(divRef.current);
    }

    return () => {
      intersectionObserver.disconnect();
    };
  }, [loadFunction]);

  return (
    <div ref={divRef} className="infinite-loader">
      <Spinner />
    </div>
  );
};
