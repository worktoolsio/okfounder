/**
 * Get the params for the current url location
 * or from a provided search
 *
 * @param providedSearch
 */
export const getUrlParams = (
  providedSearch?: string,
): Record<string, string | number | boolean> => {
  /**
   * Can only work client side if we don't provide
   * a search string
   */
  if (typeof window === 'undefined' && !providedSearch) {
    return {};
  }

  /**
   * Ensure parameters
   */
  if (providedSearch && typeof providedSearch !== 'string') {
    return {};
  }

  /**
   * Get the search from the current window
   * remove the first question mark
   * split to make an array of queries
   */
  let search = providedSearch || window.location.search || '';
  if (search[0] === '?') {
    search = search.slice(1);
  }
  const paramsArray = search.split('&');

  /**
   * Inject the params in an indexed object
   */
  const indexedParams: Record<string, string | number | boolean> = {};
  for (const param of paramsArray) {
    if (param === '') {
      continue;
    }

    const [key, value] = param.split('=');
    let parsedValue: string | number | boolean = decodeURIComponent(value);

    if (!key || !value) {
      continue;
    }

    /**
     * Parse value to have a nicer parsed result
     */
    if (!isNaN((parsedValue as unknown) as number) && parsedValue[0] !== '0') {
      parsedValue = parseFloat(parsedValue);
    } else if (parsedValue === 'true') {
      parsedValue = true;
    } else if (parsedValue === 'false') {
      parsedValue = false;
    }

    indexedParams[key] = parsedValue;
  }

  return indexedParams;
};
