import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:3000/auth/register';

  registerUser(data: any): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.apiUrl, data, { headers }).pipe(
      catchError((err) => {
        console.error('❌ Error en UserService:', err);
        return throwError(() => err);
      })
    );
  }



  getAllUsers(): Observable<any> {
    const token = this.authService.getToken();
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.get('http://localhost:3000/users', { headers }).pipe(
      catchError((err) => {
        console.error('❌ Error al obtener usuarios:', err);
        return throwError(() => err);
      })
    );
  }
}
