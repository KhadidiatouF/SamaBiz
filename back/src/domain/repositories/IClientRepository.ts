import { Client } from '../entities/Client.js';

export interface ClientFilters {
  companyId: string;
  search?: string;
  page: number;
  pageSize: number;
}

export interface ClientListResult {
  data: Client[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreateClientData {
  companyId: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface UpdateClientData {
  name?: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
}

export interface IClientRepository {
  create(data: CreateClientData): Promise<Client>;
  findById(companyId: string, id: string): Promise<Client | null>;
  findAll(filters: ClientFilters): Promise<ClientListResult>;
  update(companyId: string, id: string, data: UpdateClientData): Promise<Client>;
  delete(companyId: string, id: string): Promise<void>;
}
