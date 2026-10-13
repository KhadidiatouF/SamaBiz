import { User } from '../entities/User.js';

export interface RegisterUserData {
  companyName: string;
  name: string;
  email: string;
  passwordHash: string;
}

export interface IUserRepository {
  createOwnerWithCompany(data: RegisterUserData): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  updateRefreshTokenHash(userId: string, refreshTokenHash: string | null): Promise<void>;
}
