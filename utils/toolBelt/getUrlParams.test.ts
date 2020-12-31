import { getUrlParams } from './getUrlParams';

describe('getUrlParams utility', () => {
  test('Should return a proper data.', () => {
    /**
     * Various possible searches need to be tested
     */
    expect(getUrlParams('')).toEqual({});
    expect(getUrlParams('a=abcd')).toEqual({ a: 'abcd' });
    expect(getUrlParams('a=123')).toEqual({ a: 123 });
    expect(getUrlParams('a=123abcd')).toEqual({ a: '123abcd' });
    expect(getUrlParams('a=abcd123')).toEqual({ a: 'abcd123' });
    expect(getUrlParams('a=0123')).toEqual({ a: '0123' });
    expect(getUrlParams('a=true')).toEqual({ a: true });
    expect(getUrlParams('a=false')).toEqual({ a: false });
    expect(getUrlParams('?a=b')).toEqual({ a: 'b' });
    expect(getUrlParams('?a=1')).toEqual({ a: 1 });
    expect(getUrlParams('?a=true')).toEqual({ a: true });
    expect(getUrlParams('?a=false')).toEqual({ a: false });
    expect(getUrlParams('?a=b&c=d')).toEqual({ a: 'b', c: 'd' });
    expect(
      getUrlParams('?a=encoded%20URI%20component%20%24*%E2%82%AC%40%26'),
    ).toEqual({ a: 'encoded URI component $*€@&' });
  });
});
