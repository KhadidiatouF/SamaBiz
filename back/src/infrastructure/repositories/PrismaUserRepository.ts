import { PrismaClient, RoleName } from '@prisma/client';
import { User } from '../../domain/entities/User.js';
import { IUserRepository, RegisterUserData } from '../../domain/repositories/IUserRepository.js';

const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createOwnerWithCompany(data: RegisterUserData): Promise<User> {
    const user = await this.prisma.$transaction(async (tx) => {
      const role = await tx.role.upsert({
        where: { name: RoleName.OWNER },
        create: { name: RoleName.OWNER },
        update: {},
      });

      const company = await tx.company.create({
        data: {
          name: data.companyName,
          slug: `${toSlug(data.companyName)}-${Date.now().toString(36)}`,
        },
      });

      const trialStart = new Date();
      const trialEnd = new Date(trialStart.getTime() + 7 * 24 * 60 * 60 * 1000);

      await tx.subscription.create({
        data: {
          companyId: company.id,
          plan: 'FREE',
          status: 'TRIALING',
          trialStart,
          trialEnd,
          startsAt: trialStart,
          endsAt: trialEnd,
        },
      });

      return tx.user.create({
        data: {
          companyId: company.id,
          roleId: role.id,
          name: data.name,
          email: data.email,
          passwordHash: data.passwordHash,
        },
        include: { role: true },
      });
    });

    return {
      id: user.id,
      companyId: user.companyId,
      role: user.role.name,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email }, include: { role: true } });
    if (!user) return null;
    return {
      id: user.id,
      companyId: user.companyId,
      role: user.role.name,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
    };
  }

  async updateRefreshTokenHash(userId: string, refreshTokenHash: string | null): Promise<void> {
    await this.prisma.user.update({ where: { id: userId }, data: { refreshTokenHash } });
  }
}
