import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../core/config/api.config';

export interface DashboardSummary {
  revenue: number;
  salesCount: number;
  clientsCount: number;
  expenses: number;
  estimatedProfit: number;
  lowStockCount: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private readonly http: HttpClient) {}

  summary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${API_URL}/dashboard/summary`);
  }
}
