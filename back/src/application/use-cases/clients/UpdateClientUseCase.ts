import { Client } from '../../../domain/entities/Client.js';
import { IClientRepository } from '../../../domain/repositories/IClientRepository.js';
import { UpdateClientDTO } from '../../dto/ClientDTO.js';

export class UpdateClientUseCase {
  constructor(private readonly clients: IClientRepository) {}

  execute(companyId: string, id: string, dto: UpdateClientDTO): Promise<Client> {
    return this.clients.update(companyId, id, dto);
  }
}
