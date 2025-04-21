import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.component';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = `${environment.apiUrl}/complaints`;
  //private apiUrl = 'http://localhost:3000/complaints';

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getAllComplaints(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError((err) => {
        console.error('❌ Error al obtener denuncias:', err);
        return throwError(() => err);
      })
    );
  }

  createComplaint(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { headers: this.getHeaders() }).pipe(
      catchError((err) => {
        console.error('❌ Error al crear denuncia:', err);
        return throwError(() => err);
      })
    );
  }
}
