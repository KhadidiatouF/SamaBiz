import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().max(40).optional(),
  email: z.email().optional(),
  address: z.string().max(255).optional(),
});

export const updateClientSchema = createClientSchema.partial();

export const listClientsSchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).optional(),
  pageSize: z.coerce.number().int().min(1).max(100).optional(),
});
