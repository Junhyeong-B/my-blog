export default function Throttle<T>(
  callback: (...args: T[]) => void,
  ms: number
) {
  let timer: ReturnType<typeof setTimeout> | null;
  return (...args: T[]) => {
    if (timer) {
      return;
    }

    callback(...args);
    timer = setTimeout(() => {
      clearTimeout(timer as ReturnType<typeof setTimeout>);
      timer = null;
    }, ms);
  };
}
