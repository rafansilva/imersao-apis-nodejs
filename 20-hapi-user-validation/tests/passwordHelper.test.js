import { PasswordHelper } from '../src/helpers/passwordHelper.js';

const PASSWORD = "Salve123";
const HASH = "$2b$04$FwisWrRkqlZM3UHsomnKcukEIb5ekIo435shFfapBkiP2ThEEeDa.";

describe('UserHelper test Suite', () => {
  test('should return true if password is valid', async () => {
    const result = await PasswordHelper.hashPassword(PASSWORD);
    expect(result.length).toBeGreaterThan(10);
  });

  test('should return true if password is valid', async () => {
    const result = await PasswordHelper.comparePassword(PASSWORD, HASH);
    expect(result).toBe(true);
  });
});