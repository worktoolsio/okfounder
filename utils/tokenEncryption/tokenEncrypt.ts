import crypto from 'crypto';
import { ensureKeyIs32Bytes } from './ensureKeyIs32Bytes';

/**
 * Encrypt an object into a string with the global ENCRYPTION_KEY
 *
 * @param tokenData object
 */
export const tokenEncrypt: (
  tokenData: Record<string, unknown> | string | number,
) => string = (tokenData) => {
  /**
   * A random init vector to start the cipher
   * The length is always 16 for AES
   */
  const initializationVector = crypto.randomBytes(16);

  const Key32Bytes = ensureKeyIs32Bytes(
    process.env.SECRET_ENCRYPTION_KEY as string,
  );
  if (!Key32Bytes) {
    throw new Error('SECRET_ENCRYPTION_KEY is not defined in the environment.');
  }
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(Key32Bytes as string),
    initializationVector,
  );

  let encrypted = cipher.update(JSON.stringify(tokenData));
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  /**
   * We include the initialization vector to be able
   * to decrypt the data later
   */
  return initializationVector.toString('hex') + ':' + encrypted.toString('hex');
};
