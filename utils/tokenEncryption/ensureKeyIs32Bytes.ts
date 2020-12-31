/**
 * This helper makes sure that the key we pass to the
 * token encryption helpers is 32 bytes.
 *
 * It requires a key with at least 20 bytes
 *
 * @param key string
 */
export const ensureKeyIs32Bytes = (key: string | number): string => {
  if (!key || typeof key !== 'string') {
    throw new TypeError('Key must be a string.');
  }

  if (key.length < 20) {
    throw new Error(
      'Your private key is too short. It must be at least 20 bytes long and aim for 32 bytes.',
    );
  }

  return (key + '£'.repeat(20)).substring(0, 32);
};
