import crypto from 'crypto';
import { ensureKeyIs32Bytes } from './ensureKeyIs32Bytes';

/**
 * Encrypt a string into a object with the global SECRET_ENCRYPTION_KEY
 *
 * @param encryptedToken
 */
export const tokenDecrypt: (
  encryptedToken: string,
) => Record<string, unknown> = (encryptedToken) => {
  try {
    /**
     * The encrypted token is split between the data
     * and the init vector
     */
    const textParts = encryptedToken.split(':');
    /**
     * The init vector
     */
    const initializationVector2 = Buffer.from(
      textParts.shift() as string,
      'hex',
    );
    /**
     * The Data
     */
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    /**
     * Decrypt
     */
    const Key32Bytes = ensureKeyIs32Bytes(
      process.env.SECRET_ENCRYPTION_KEY as string,
    );
    if (!Key32Bytes) {
      throw new Error(
        'SECRET_ENCRYPTION_KEY is not defined in the environment.',
      );
    }
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(Key32Bytes),
      initializationVector2,
    );
    let decrypted = decipher.update(encryptedText);

    /**
     * Return the data
     */
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return JSON.parse(decrypted.toString());
  } catch (error) {
    /**
     * If it fails, it probably means that the token was
     * invalid or forged
     */
    return null;
  }
};
