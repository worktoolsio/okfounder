import { tokenEncrypt } from './tokenEncrypt';
import { tokenDecrypt } from './tokenDecrypt';

describe('Tokens decryption', () => {
  test('Check decryption', () => {
    const initialData = { a: 1 };
    const encryptedData = tokenEncrypt(initialData);
    const decryptedData = tokenDecrypt(encryptedData);

    expect(JSON.stringify(initialData)).toBe(JSON.stringify(decryptedData));
  });

  test('Invalid token should return null', () => {
    expect(tokenDecrypt('hello')).toBe(null);
    // @ts-ignore : should throw
    expect(tokenDecrypt(null)).toBe(null);
    expect(tokenDecrypt('')).toBe(null);
    // @ts-ignore : should throw
    expect(tokenDecrypt(undefined)).toBe(null);
    // @ts-ignore : should throw
    expect(tokenDecrypt([])).toBe(null);
    // @ts-ignore : should throw
    expect(tokenDecrypt({})).toBe(null);
    expect(
      tokenDecrypt(
        'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii:dddddddddddddddddddddddddddddddd',
      ),
    ).toBe(null);
  });
});
