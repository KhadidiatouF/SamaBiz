import { Request, Response } from 'express';
import { GetDashboardSummaryUseCase } from '../../application/use-cases/dashboard/GetDashboardSummaryUseCase.js';
import { AuthenticationError } from '../../domain/errors/AppError.js';

export class DashboardController {
  constructor(private readonly getSummary: GetDashboardSummaryUseCase) {}

  summary = async (req: Request, res: Response) => {
    if (!req.auth?.companyId) throw new AuthenticationError();
    res.json(await this.getSummary.execute(req.auth.companyId));
  };
}
