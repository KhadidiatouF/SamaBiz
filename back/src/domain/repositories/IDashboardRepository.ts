export interface DashboardSummary {
  revenue: number;
  salesCount: number;
  clientsCount: number;
  expenses: number;
  estimatedProfit: number;
  lowStockCount: number;
  recentOrders: Array<{
    id: string;
    status: string;
    totalAmount: number;
    createdAt: Date;
  }>;
}

export interface IDashboardRepository {
  getSummary(companyId: string): Promise<DashboardSummary>;
}
