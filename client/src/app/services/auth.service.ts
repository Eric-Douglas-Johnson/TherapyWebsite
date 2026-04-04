import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

interface AuthResponse {
  token: string;
  user: { id: string; email: string; role: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private _loggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  isLoggedIn$ = this._loggedIn$.asObservable();

  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { email, password }).pipe(
      tap(res => this.handleAuth(res))
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => this.handleAuth(res))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this._loggedIn$.next(false);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role ?? null;
    } catch {
      return null;
    }
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  isAdmin() {
    return this.getRole() === 'admin';
  }

  isTherapist() {
    return this.getRole() === 'therapist';
  }

  private handleAuth(res: AuthResponse) {
    localStorage.setItem('token', res.token);
    this._loggedIn$.next(true);
  }
}
