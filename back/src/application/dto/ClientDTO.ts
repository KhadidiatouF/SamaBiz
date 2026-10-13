export interface CreateClientDTO {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface UpdateClientDTO {
  name?: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
}
