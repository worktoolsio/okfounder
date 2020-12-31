/**
 * This method will debounce a function
 *
 * @param func
 * @param waitFor
 */
export const debounce = <F extends (...args: Array<any>) => any>(
  func: F,
  waitFor: number,
): ((...args: any) => void | Promise<void>) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};
