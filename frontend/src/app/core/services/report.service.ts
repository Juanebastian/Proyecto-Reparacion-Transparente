import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private apiUrl = 'http://localhost:3000/reports';

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  /**
   * Obtener todos los reportes
   */
  getAllReports(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError((err) => {
        console.error('❌ Error al obtener reportes:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Crear un nuevo reporte (JSON plano)
   */
  createReport(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { headers: this.getHeaders() }).pipe(
      catchError((err) => {
        console.error('❌ Error al crear reporte:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Crear un reporte con archivo (formulario multipart/form-data)
   */
  createReportWithFile(formData: FormData): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.apiUrl + '/upload', formData, { headers }).pipe(
      catchError((err) => {
        console.error('❌ Error al subir reporte con archivo:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Obtener un solo reporte por ID
   */
  getReportById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((err) => {
        console.error('❌ Error al obtener reporte por ID:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Actualizar un reporte
   */
  updateReport(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() }).pipe(
      catchError((err) => {
        console.error('❌ Error al actualizar reporte:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Eliminar un reporte
   */
  deleteReport(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((err) => {
        console.error('❌ Error al eliminar reporte:', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * cargar reporte apartir de la ID del usuario
   */
  getReportsByUser(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${userId}`, {
      headers: this.getHeaders(),
    }).pipe(
      catchError((err) => {
        console.error('❌ Error al obtener reportes por usuario:', err);
        return throwError(() => err);
      })
    );
  }
  
}
