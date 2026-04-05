import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';

interface AuthUser {
  id: string;
  email: string;
  role: string;
}

interface AuthResponse {
  user: AuthUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api/auth';
  private _loggedIn$ = new BehaviorSubject<boolean>(false);
  private _user$ = new BehaviorSubject<AuthUser | null>(null);

  isLoggedIn$ = this._loggedIn$.asObservable();
  user$ = this._user$.asObservable();

  constructor(private http: HttpClient) {
    // Check auth status on app startup
    this.checkAuth().subscribe();
  }

  register(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { email, password }, { withCredentials: true }).pipe(
      tap(res => this.setUser(res.user))
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      tap(res => this.setUser(res.user))
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.clearSession())
    );
  }

  refresh(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, {}, { withCredentials: true }).pipe(
      tap(res => this.setUser(res.user))
    );
  }

  checkAuth(): Observable<AuthResponse | null> {
    return this.http.get<AuthResponse>(`${this.apiUrl}/me`, { withCredentials: true }).pipe(
      tap(res => this.setUser(res.user)),
      catchError(() => {
        this.clearSession();
        return of(null);
      })
    );
  }

  isLoggedIn(): boolean {
    return this._loggedIn$.value;
  }

  getRole(): string | null {
    return this._user$.value?.role ?? null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isTherapist(): boolean {
    return this.getRole() === 'therapist';
  }

  clearSession() {
    this._user$.next(null);
    this._loggedIn$.next(false);
  }

  private setUser(user: AuthUser) {
    this._user$.next(user);
    this._loggedIn$.next(true);
  }
}
