import { createApp } from './app.js';
import { env } from './infrastructure/config/env.js';
import { prisma } from './infrastructure/database/prisma.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`SamaBiz API running on http://localhost:${env.PORT}/api`);
});

const shutdown = async () => {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
