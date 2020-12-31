import { validateEmail } from './validateEmail';

describe('Test "validateEmail" utility', () => {
  test('Valid emails should return true.', () => {
    expect(validateEmail('user@email.com')).toBe(true);
    expect(validateEmail('user-100@email.com')).toBe(true);
    expect(validateEmail('user.100@email.com')).toBe(true);
    expect(validateEmail('user111@user.com')).toBe(true);
    expect(validateEmail('user-100@user.net')).toBe(true);
    expect(validateEmail('user.100@user.com.au')).toBe(true);
    expect(validateEmail('user@1.com')).toBe(true);
    expect(validateEmail('user@gmail.com.com')).toBe(true);
    expect(validateEmail('user+100@gmail.com')).toBe(true);
    expect(validateEmail('user-100@email-test.com')).toBe(true);
  });

  test('Invalid email should return false.', () => {
    expect(validateEmail('user')).toBe(false);
    expect(validateEmail('user@.com.my')).toBe(false);
    expect(validateEmail('user123@gmail.a')).toBe(false);
    expect(validateEmail('user123@.com')).toBe(false);
    expect(validateEmail('user123@.com.com')).toBe(false);
    expect(validateEmail('.user@user.com')).toBe(false);
    expect(validateEmail('user()*@gmail.com')).toBe(false);
    expect(validateEmail('user@%*.com')).toBe(false);
    expect(validateEmail('user..2002@gmail.com')).toBe(false);
    expect(validateEmail('user.@gmail.com')).toBe(false);
    expect(validateEmail('user@user@gmail.com')).toBe(false);
    expect(validateEmail('user@gmail.com.1a')).toBe(false);
  });
});
