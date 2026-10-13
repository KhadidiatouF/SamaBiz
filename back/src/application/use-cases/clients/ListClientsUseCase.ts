import { ClientListResult, IClientRepository } from '../../../domain/repositories/IClientRepository.js';

export interface ListClientsQuery {
  search?: string;
  page?: number;
  pageSize?: number;
}

export class ListClientsUseCase {
  constructor(private readonly clients: IClientRepository) {}

  execute(companyId: string, query: ListClientsQuery): Promise<ClientListResult> {
    return this.clients.findAll({
      companyId,
      search: query.search,
      page: query.page ?? 1,
      pageSize: Math.min(query.pageSize ?? 20, 100),
    });
  }
}
