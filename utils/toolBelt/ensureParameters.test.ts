import { ensureParameters } from './ensureParameters';
import { validateEmail } from './validateEmail';

describe('Test "ensureParameters" utility', () => {
  test('Valid params should not throw.', () => {
    expect(() =>
      ensureParameters(
        [
          {
            key: 'keyName',
            value: 'value',
            type: 'string',
          },
          {
            key: 'keyName',
            value: 10,
            type: 'number',
          },
          {
            key: 'keyName',
            value: true,
            type: 'boolean',
          },
          {
            key: 'keyName',
            value: {
              a: 1,
            },
            type: 'object',
          },
        ],
        'methodPath/methodName',
      ),
    ).not.toThrow();

    expect(() =>
      ensureParameters(
        [
          {
            key: 'keyName',
            value: 'hello@mail.com',
            check: validateEmail,
          },
        ],
        'methodPath/methodName',
      ),
    ).not.toThrow();

    expect(() =>
      ensureParameters(
        [
          {
            key: 'keyName',
            value: undefined,
            type: 'string',
            optional: true,
          },
        ],
        'methodPath/methodName',
      ),
    ).not.toThrow();
  });

  test('Invalid params should throw.', () => {
    expect(() =>
      ensureParameters(
        [
          {
            key: 'keyName',
            value: 10,
            type: 'string',
          },
          {
            key: 'keyName',
            value: '10',
            type: 'number',
          },
          {
            key: 'keyName',
            value: {
              a: 1,
            },
            type: 'boolean',
          },
          {
            key: 'keyName',
            value: null,
            type: 'object',
          },
        ],
        'methodPath/methodName',
      ),
    )
      .toThrow(`"methodPath/methodName" failed because its arguments did not pass the validation step:
- "keyName" should be a "string" and is "number": 10
- "keyName" should be a "boolean" and is "object": [object Object]
- "keyName" should be a "object" and is "object": null`);

    expect(() =>
      ensureParameters(
        [
          {
            key: 'keyName',
            value: 'hello',
            check: validateEmail,
          },
        ],
        'methodPath/methodName',
      ),
    )
      .toThrow(`"methodPath/methodName" failed because its arguments did not pass the validation step:
- "keyName" did not pass its validation check for this value: hello`);
  });
});
