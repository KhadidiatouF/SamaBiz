import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(12),
  JWT_REFRESH_SECRET: z.string().min(12),
  PORT: z.coerce.number().default(3000),
  FRONTEND_URL: z.string().url().default('http://localhost:4200'),
  NODE_ENV: z.string().default('development'),
});

export const env = envSchema.parse(process.env);
