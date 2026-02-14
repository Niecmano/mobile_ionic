import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string; // user id (uid)
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiKey = environment.firebase.apiKey;

  private tokenKey = 'auth_token';
  private uidKey = 'auth_uid';

  isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  // REGISTER
  register(email: string, password: string) {
    const url =
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;

    return this.http.post<AuthResponse>(url, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      tap(res => this.saveAuth(res))
    );
  }

  // LOGIN
  login(email: string, password: string) {
    const url =
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;

    return this.http.post<AuthResponse>(url, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      tap(res => this.saveAuth(res))
    );
  }

  // LOGOUT
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.uidKey);
    this.isLoggedIn$.next(false);
  }

  // TOKEN GETTER
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUid(): string | null {
    return localStorage.getItem(this.uidKey);
  }

  // PRIVATE

  private saveAuth(res: AuthResponse) {
    localStorage.setItem(this.tokenKey, res.idToken);
    localStorage.setItem(this.uidKey, res.localId);
    this.isLoggedIn$.next(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
