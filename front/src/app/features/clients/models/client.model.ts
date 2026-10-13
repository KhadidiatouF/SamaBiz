export interface Client {
  id: string;
  companyId: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ClientListResult {
  data: Client[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ClientPayload {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
}
