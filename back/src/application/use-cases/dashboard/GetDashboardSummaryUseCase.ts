import { DashboardSummary, IDashboardRepository } from '../../../domain/repositories/IDashboardRepository.js';

export class GetDashboardSummaryUseCase {
  constructor(private readonly dashboard: IDashboardRepository) {}

  execute(companyId: string): Promise<DashboardSummary> {
    return this.dashboard.getSummary(companyId);
  }
}
