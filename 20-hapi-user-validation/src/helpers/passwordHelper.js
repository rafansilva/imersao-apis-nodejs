import Bcrypt from 'bcrypt';
import { promisify } from 'util';

const hashAsync = promisify(Bcrypt.hash);
const compareAsync = promisify(Bcrypt.compare);
const SALT = 3;

export class PasswordHelper {

  static hashPassword(password) {
    return hashAsync(password, SALT);
  }

  static comparePassword(password, hash) {
    return compareAsync(password, hash);
  }
}