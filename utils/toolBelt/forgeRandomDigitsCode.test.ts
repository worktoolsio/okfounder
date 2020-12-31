import { forgeRandomDigitsCode } from './forgeRandomDigitsCode';

const testNumeralsRegex = /^[0-9]+$/;

describe('Test "forgeRandomDigitsCode" utility', () => {
  test('Should return a n digits code.', () => {
    const code1 = forgeRandomDigitsCode(1);
    expect(typeof code1).toBe('string');
    expect(code1.length).toBe(1);
    expect(testNumeralsRegex.test(code1)).toBe(true);

    const code10 = forgeRandomDigitsCode(10);
    expect(typeof code10).toBe('string');
    expect(code10.length).toBe(10);
    expect(testNumeralsRegex.test(code10)).toBe(true);

    const code1000 = forgeRandomDigitsCode(1000);
    expect(typeof code1000).toBe('string');
    expect(code1000.length).toBe(1000);
    expect(testNumeralsRegex.test(code1000)).toBe(true);
  });
});
