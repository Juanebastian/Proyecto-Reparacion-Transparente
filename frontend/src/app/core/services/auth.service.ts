import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment.component';



interface LoginResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    access_token: string;
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
  private apiUrl = `${environment.apiUrl}/auth`; // ✅ Usar variable global
  //private apiUrl = 'http://localhost:3000/auth'; // 🛠️ Reemplázalo con la URL real de tu backend
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
      //console.log('Respuesta del backend:', response); // Verificar la respuesta en consola

      if (response.success && response.data) {
        this.saveToken(response.data.access_token);        // ✅ Guarda el token
        this.decodeAndSaveUserFromToken();                 // ✅ Decodifica y guarda el usuario
        this.authState.next(true);                         // ✅ Actualiza el estado de autenticación
      } else {
        throw new Error(response.message || 'Error al iniciar sesión');
      }
    }),
    catchError(error => {
      console.error('Error en login:', error);
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
    this.router.navigate(['/ciudadanos']); // 🔄 Redirige al login después de cerrar sesión
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


/**
 * Decodifica el token JWT y guarda los datos del usuario en localStorage.
 */
private decodeAndSaveUserFromToken(): void {
  const token = this.getToken();
  if (!token) return;

  try {
    const decoded = jwtDecode<any>(token);

    // Aquí asumimos que el token contiene algo como: { data: { usuario: {...} } }
    const user = decoded?.data?.usuario;

    if (user) {
      this.saveUserInfo(user);
    } else {
      console.warn('No se encontró información de usuario dentro del token');
    }
  } catch (error) {
    console.error('Error al decodificar el token JWT:', error);
  }
}




}
