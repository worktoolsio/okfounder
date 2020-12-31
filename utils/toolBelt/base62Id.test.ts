import { base62Id } from './base62Id';

describe('Test "base62Id" utility', () => {
  test('Should return a n digits code.', () => {
    const id1 = base62Id();
    expect(/^[0-9a-zA-Z]{7}$/.test(id1)).toBe(true);

    const id2 = base62Id(0);
    expect(id2).toBe('');

    const id3 = base62Id(100);
    expect(/^[0-9a-zA-Z]{100}$/.test(id3)).toBe(true);
  });
});
