import { tokenEncrypt } from './tokenEncrypt';

describe('Tokens encryption', () => {
  test('Check encryption components', () => {
    const data = { a: 1 };
    const encryptedData = tokenEncrypt(data);

    expect(typeof encryptedData).toBe('string');

    const parts = encryptedData.split(':');

    expect(parts.length).toBe(2);

    expect(parts[0].length).toBe(32);
  });
});
