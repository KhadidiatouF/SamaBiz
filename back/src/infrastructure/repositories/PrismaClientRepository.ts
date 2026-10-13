import { Prisma, PrismaClient } from '@prisma/client';
import { Client } from '../../domain/entities/Client.js';
import {
  ClientFilters,
  ClientListResult,
  CreateClientData,
  IClientRepository,
  UpdateClientData,
} from '../../domain/repositories/IClientRepository.js';

export class PrismaClientRepository implements IClientRepository {
  constructor(private readonly prisma: PrismaClient) {}

  create(data: CreateClientData): Promise<Client> {
    return this.prisma.client.create({ data });
  }

  findById(companyId: string, id: string): Promise<Client | null> {
    return this.prisma.client.findFirst({ where: { id, companyId } });
  }

  async findAll(filters: ClientFilters): Promise<ClientListResult> {
    const where: Prisma.ClientWhereInput = {
      companyId: filters.companyId,
      ...(filters.search
        ? {
            OR: [
              { name: { contains: filters.search, mode: 'insensitive' } },
              { email: { contains: filters.search, mode: 'insensitive' } },
              { phone: { contains: filters.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.client.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (filters.page - 1) * filters.pageSize,
        take: filters.pageSize,
      }),
      this.prisma.client.count({ where }),
    ]);

    return { data, total, page: filters.page, pageSize: filters.pageSize };
  }

  update(companyId: string, id: string, data: UpdateClientData): Promise<Client> {
    return this.prisma.client.update({ where: { id_companyId: { id, companyId } }, data });
  }

  async delete(companyId: string, id: string): Promise<void> {
    await this.prisma.client.delete({ where: { id_companyId: { id, companyId } } });
  }
}
