export function throttle<F extends (...args: any[]) => any>(limit: number, func: F) {
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;

  return function (...args: Parameters<F>) {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}
