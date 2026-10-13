import { Client } from '../../../domain/entities/Client.js';
import { NotFoundError } from '../../../domain/errors/AppError.js';
import { IClientRepository } from '../../../domain/repositories/IClientRepository.js';

export class GetClientUseCase {
  constructor(private readonly clients: IClientRepository) {}

  async execute(companyId: string, id: string): Promise<Client> {
    const client = await this.clients.findById(companyId, id);
    if (!client) {
      throw new NotFoundError('Client introuvable');
    }
    return client;
  }
}
