import { describe, expect, it, vi } from 'vitest';
import { ListClientsUseCase } from '../src/application/use-cases/clients/ListClientsUseCase.js';

describe('ListClientsUseCase', () => {
  it('always scopes listing with the current company id', async () => {
    const repository = { findAll: vi.fn().mockResolvedValue({ data: [], total: 0, page: 1, pageSize: 20 }) };
    const useCase = new ListClientsUseCase(repository);
    await useCase.execute('company-a', { search: 'fatou' });
    expect(repository.findAll).toHaveBeenCalledWith({ companyId: 'company-a', search: 'fatou', page: 1, pageSize: 20 });
  });
});
