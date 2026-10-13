import { describe, expect, it, vi } from 'vitest';
import { RegisterUserUseCase } from '../src/application/use-cases/auth/RegisterUserUseCase.js';
import { IUserRepository } from '../src/domain/repositories/IUserRepository.js';

const users: IUserRepository = {
  findByEmail: vi.fn().mockResolvedValue(null),
  createOwnerWithCompany: vi.fn().mockResolvedValue({ id: 'user-1', companyId: 'company-1', role: 'OWNER', name: 'Awa', email: 'awa@sunubiz.test', passwordHash: 'hash' }),
  updateRefreshTokenHash: vi.fn().mockResolvedValue(undefined),
};

const hasher = { hash: vi.fn().mockResolvedValue('hash'), compare: vi.fn() };
const tokens = { signAccessToken: vi.fn().mockReturnValue('access'), signRefreshToken: vi.fn().mockReturnValue('refresh'), verifyAccessToken: vi.fn() };

describe('RegisterUserUseCase', () => {
  it('creates an owner with a company and returns a session', async () => {
    const useCase = new RegisterUserUseCase(users, hasher, tokens);
    const result = await useCase.execute({ companyName: 'Awa Shop', name: 'Awa', email: 'awa@sunubiz.test', password: 'password123' });
    expect(result.user.companyId).toBe('company-1');
    expect(result.user.role).toBe('OWNER');
    expect(result.accessToken).toBe('access');
  });
});
