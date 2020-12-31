import { ensureKeyIs32Bytes } from './ensureKeyIs32Bytes';

describe('Ensure that the private key is 32 bytes', () => {
  test('Ensure parameters', () => {
    expect(() => {
      // @ts-ignore : should throw
      ensureKeyIs32Bytes();
    }).toThrow('Key must be a string.');

    expect(() => {
      // @ts-ignore : should throw
      ensureKeyIs32Bytes({});
    }).toThrow('Key must be a string.');

    expect(() => {
      // @ts-ignore : should throw
      ensureKeyIs32Bytes([]);
    }).toThrow('Key must be a string.');

    expect(() => {
      // @ts-ignore : should throw
      ensureKeyIs32Bytes(null);
    }).toThrow('Key must be a string.');

    expect(() => {
      // @ts-ignore : should throw
      ensureKeyIs32Bytes(10);
    }).toThrow('Key must be a string.');

    expect(() => {
      // @ts-ignore : should throw
      ensureKeyIs32Bytes(undefined);
    }).toThrow('Key must be a string.');

    expect(() => {
      // @ts-ignore : should throw
      ensureKeyIs32Bytes('hello');
    }).toThrow(
      'Your private key is too short. It must be at least 20 bytes long and aim for 32 bytes.',
    );
  });

  test('Key too long should be shortened', () => {
    expect(
      ensureKeyIs32Bytes(
        'This is a super long key that will be shortened by the method.',
      ),
    ).toBe('This is a super long key that wi');
  });

  test('Key too short should be extended', () => {
    expect(ensureKeyIs32Bytes('This key is too sort.')).toBe(
      'This key is too sort.£££££££££££',
    );
  });

  test('Key with the right length should return as passed', () => {
    expect(ensureKeyIs32Bytes('This key is the right length !!!')).toBe(
      'This key is the right length !!!',
    );
  });
});
