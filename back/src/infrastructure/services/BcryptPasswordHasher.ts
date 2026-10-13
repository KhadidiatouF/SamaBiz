import bcrypt from 'bcrypt';
import { IPasswordHasher } from '../../application/services/IPasswordHasher.js';

export class BcryptPasswordHasher implements IPasswordHasher {
  private readonly saltRounds = 12;

  hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.saltRounds);
  }

  compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
