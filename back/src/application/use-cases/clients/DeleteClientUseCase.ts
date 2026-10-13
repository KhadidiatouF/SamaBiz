import { IClientRepository } from '../../../domain/repositories/IClientRepository.js';

export class DeleteClientUseCase {
  constructor(private readonly clients: IClientRepository) {}

  execute(companyId: string, id: string): Promise<void> {
    return this.clients.delete(companyId, id);
  }
}
