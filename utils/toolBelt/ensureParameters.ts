import { isObject } from './isObject';

interface IMethodParam {
  key: string;
  value: any;
  type?: 'number' | 'boolean' | 'string' | 'undefined' | 'null' | 'object';
  check?: (value: any) => boolean;
  optional?: boolean;
}

/**
 * This method will check that all the params correspond to what
 * is needed by a function. If not, it will thow an error
 * @param params
 */
export const ensureParameters = (
  params: Array<IMethodParam> | IMethodParam,
  methodName: string,
): void => {
  const errors: Array<string> = [];

  const arrayParams: Array<IMethodParam> = Array.isArray(params)
    ? params
    : [params];

  for (const param of arrayParams) {
    if (param.optional && param.value === undefined) {
      continue;
    }

    if (param.type) {
      if (
        (param.type === 'string' && typeof param.value !== 'string') ||
        (param.type === 'boolean' && typeof param.value !== 'boolean') ||
        (param.type === 'undefined' && param.value == undefined) ||
        (param.type === 'null' && param.value == null) ||
        (param.type === 'object' && !isObject(param.value)) ||
        (param.type === 'number' && isNaN(param.value))
      ) {
        errors.push(
          `"${param.key}" should be a "${
            param.type
          }" and is "${typeof param.value}": ${String(param.value)}`,
        );
      }
    }

    if (param.check && !param.check(param.value)) {
      errors.push(
        `"${
          param.key
        }" did not pass its validation check for this value: ${String(
          param.value,
        )}`,
      );
    }
  }

  if (errors.length > 0) {
    throw `"${methodName}" failed because its arguments did not pass the validation step:
- ${errors.join('\n- ')}`;
  }
};
