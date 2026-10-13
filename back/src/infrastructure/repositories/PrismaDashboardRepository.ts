import { PrismaClient } from '@prisma/client';
import { DashboardSummary, IDashboardRepository } from '../../domain/repositories/IDashboardRepository.js';

const decimalToNumber = (value: { toNumber(): number } | null): number => value?.toNumber() ?? 0;

export class PrismaDashboardRepository implements IDashboardRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getSummary(companyId: string): Promise<DashboardSummary> {
    const [salesAggregate, salesCount, clientsCount, expenseAggregate, products, recentOrders] =
      await this.prisma.$transaction([
        this.prisma.sale.aggregate({ where: { companyId }, _sum: { totalAmount: true } }),
        this.prisma.sale.count({ where: { companyId } }),
        this.prisma.client.count({ where: { companyId } }),
        this.prisma.expense.aggregate({ where: { companyId }, _sum: { amount: true } }),
        this.prisma.product.findMany({ where: { companyId }, select: { quantity: true, lowStockLevel: true } }),
        this.prisma.order.findMany({
          where: { companyId },
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: { id: true, status: true, totalAmount: true, createdAt: true },
        }),
      ]);

    const revenue = decimalToNumber(salesAggregate._sum.totalAmount);
    const expenses = decimalToNumber(expenseAggregate._sum.amount);

    return {
      revenue,
      salesCount,
      clientsCount,
      expenses,
      estimatedProfit: revenue - expenses,
      lowStockCount: products.filter((product) => product.quantity <= product.lowStockLevel).length,
      recentOrders: recentOrders.map((order) => ({
        id: order.id,
        status: order.status,
        totalAmount: order.totalAmount.toNumber(),
        createdAt: order.createdAt,
      })),
    };
  }
}
