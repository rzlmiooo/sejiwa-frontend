import generateUsernameFromEmail from '@/app/utils/auth/generateUsernameFromEmail';

describe('generateUsernameFromEmail Utility', () => {
  test('should return capitalized local name for standard email', () => {
    expect(generateUsernameFromEmail('budi.kurniawan123@gmail.com')).toBe('Budi');
  });

  test('should return capitalized local name when there are numbers or periods', () => {
    expect(generateUsernameFromEmail('andi_kurniawan@sejiwa.com')).toBe('Andi');
    expect(generateUsernameFromEmail('rudi123@sejiwa.com')).toBe('Rudi');
  });

  test('should return "User" if email is empty or null', () => {
    expect(generateUsernameFromEmail('')).toBe('User');
    expect(generateUsernameFromEmail(null)).toBe('User');
    expect(generateUsernameFromEmail(undefined)).toBe('User');
  });

  test('should return "User" if local part starts with a number or special character', () => {
    expect(generateUsernameFromEmail('123budi@gmail.com')).toBe('User');
    expect(generateUsernameFromEmail('.andi@gmail.com')).toBe('User');
  });

  test('should work for simple emails without domain structure', () => {
    expect(generateUsernameFromEmail('riri')).toBe('Riri');
  });
});
