/**
 * Returns an n digits code. Default value for n is 9
 */
export const forgeRandomDigitsCode = (digitsCount = 9): string => {
  const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let randomDigitsCode = '';

  for (let i = 0; i < digitsCount; i++) {
    randomDigitsCode += values[Math.round(Math.random() * 9)];
  }

  return randomDigitsCode;
};
