export default function debounce<T>(
  callback: (...args: T[]) => void,
  ms: number
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: T[]) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      callback(...args);
    }, ms);
  };
}
