import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface LoginResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    access_token: string;
    usuario: {
      id: string;
      nombreUsuario: string;
      email: string;
      rol: string;
    };
  };
}

interface JwtPayload {
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // 🛠️ Reemplázalo con la URL real de tu backend
  private authState = new BehaviorSubject<boolean>(this.hasToken());

  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() { }

  /**
   * Iniciar sesión con email y contraseña
   */
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        console.log('Respuesta del backend:', response); // Verificar la respuesta en consola

        // ✅ Si el backend indica que fue exitoso
        if (response.success && response.data) {
          this.saveToken(response.data.access_token); // Guardar el token en localStorage o donde decidas
          this.saveUserInfo(response.data.usuario);   // Guardar los datos del usuario
          this.authState.next(true); // Actualizar el estado de autenticación
        } else {
          // ❌ Si no es exitoso, lanzar un error para que lo maneje el suscriptor
          throw new Error(response.message || 'Error al iniciar sesión');
        }
      }),
      catchError(error => {
        console.error('Error en login:', error);

        // 👇 Si viene un error directo del servidor, como status 500 o 401
        const message = error?.error?.message || error?.message || 'Error al iniciar sesión';

        return throwError(() => ({ message }));
      })
    );
  }



  /**
   * Cerrar sesión del usuario
   */
  logout(): void {
    this.clearToken();
    this.clearUserInfo();
    this.authState.next(false);
    this.router.navigate(['/login']); // 🔄 Redirige al login después de cerrar sesión
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable();
  }

  /**
   * Obtiene el token almacenado
   */
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  /**
   * Guarda el token en localStorage
   */
  private saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  /**
   * Guarda la información del usuario en localStorage
   */
  private saveUserInfo(usuario: { id: string; nombreUsuario: string; email: string; rol: string }): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_info', JSON.stringify(usuario));
    }
  }

  /**
   * Obtiene la información del usuario desde localStorage
   */
  getUserInfo(): any | null {
    if (typeof window !== 'undefined') {
      const userInfo = localStorage.getItem('user_info');
      return userInfo ? JSON.parse(userInfo) : null;
    }
    return null;
  }

  /**
   * Elimina el token de autenticación
   */
  private clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  /**
   * Elimina la información del usuario
   */
  private clearUserInfo(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_info');
    }
  }

  /**
   * Verifica si existe un token en localStorage
   */
  private hasToken(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('auth_token');
  }

  /**
   * Verifica si el token ya expiró
   */
  private isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch (error) {
      console.error('Token inválido o corrupto');
      return true;
    }
  }

  /**
   * Revisa periódicamente si el token expiró
   */
  private autoLogoutCheck() {
    setInterval(() => {
      if (this.isTokenExpired()) {
        console.warn('Token expirado. Cerrando sesión automáticamente...');
        this.logout();
      }
    }, 60 * 1000); // Cada 1 minuto
  }

  /**
 * Obtiene el ID del usuario autenticado
 */
  getUserId(): string | null {
    const user = this.getUserInfo();
    return user?.id || null;
  }
}
