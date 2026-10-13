import { Client } from '../../../domain/entities/Client.js';
import { IClientRepository } from '../../../domain/repositories/IClientRepository.js';
import { CreateClientDTO } from '../../dto/ClientDTO.js';

export class CreateClientUseCase {
  constructor(private readonly clients: IClientRepository) {}

  execute(companyId: string, dto: CreateClientDTO): Promise<Client> {
    return this.clients.create({ companyId, ...dto });
  }
}
