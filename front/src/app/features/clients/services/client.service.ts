import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../../core/config/api.config';
import { Client, ClientListResult, ClientPayload } from '../models/client.model';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private readonly http: HttpClient) {}

  list(search = ''): Observable<ClientListResult> {
    const params = search ? new HttpParams().set('search', search) : undefined;
    return this.http.get<ClientListResult>(`${API_URL}/clients`, { params });
  }

  create(payload: ClientPayload): Observable<Client> {
    return this.http.post<Client>(`${API_URL}/clients`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/clients/${id}`);
  }
}
