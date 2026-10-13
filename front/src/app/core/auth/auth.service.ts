import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_URL } from '../config/api.config';
import { AuthSession, AuthUser, LoginPayload, RegisterPayload } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'sunubiz.accessToken';
  private readonly refreshKey = 'sunubiz.refreshToken';
  private readonly userKey = 'sunubiz.user';
  private readonly userState = signal<AuthUser | null>(this.readUser());

  readonly user = this.userState.asReadonly();
  readonly isAuthenticated = computed(() => Boolean(this.accessToken));

  constructor(private readonly http: HttpClient) {}

  get accessToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(payload: LoginPayload): Observable<AuthSession> {
    return this.http.post<AuthSession>(`${API_URL}/auth/login`, payload).pipe(tap((session) => this.persist(session)));
  }

  register(payload: RegisterPayload): Observable<AuthSession> {
    return this.http.post<AuthSession>(`${API_URL}/auth/register`, payload).pipe(tap((session) => this.persist(session)));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshKey);
    localStorage.removeItem(this.userKey);
    this.userState.set(null);
  }

  private persist(session: AuthSession): void {
    localStorage.setItem(this.tokenKey, session.accessToken);
    localStorage.setItem(this.refreshKey, session.refreshToken);
    localStorage.setItem(this.userKey, JSON.stringify(session.user));
    this.userState.set(session.user);
  }

  private readUser(): AuthUser | null {
    const raw = localStorage.getItem(this.userKey);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  }
}
