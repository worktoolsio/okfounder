/**
 * Determine the mobile operating system.
 *
 * @returns {EMobileOperator}
 */

export enum EMobileOperator {
  WINDOWS_PHONE = 'WINDOWS_PHONE',
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  UNKNOWN = 'UNKNOWN',
}

export const getMobileOperatingSystem = (): EMobileOperator => {
  const userAgent = navigator.userAgent || navigator.vendor;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return EMobileOperator.WINDOWS_PHONE;
  }

  if (/android/i.test(userAgent)) {
    return EMobileOperator.ANDROID;
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return EMobileOperator.IOS;
  }

  return EMobileOperator.UNKNOWN;
};
