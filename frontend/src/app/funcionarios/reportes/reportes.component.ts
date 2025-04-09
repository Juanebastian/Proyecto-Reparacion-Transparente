import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../core/services/report.service';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "../../reportes/register/register.component";

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, RegisterComponent],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  reportes: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private reportService: ReportService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarReportes();
  }

  cargarReportes() {
    this.loading = true;
    const userId = this.authService.getUserId(); // 👈 obtener el ID

    if (!userId) {
      this.error = 'Usuario no autenticado';
      this.loading = false;
      return;
    }

    this.reportService.getReportsByUser(userId).subscribe({
      next: (data) => {
        this.reportes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar reportes:', err);
        this.error = 'Error al cargar reportes';
        this.loading = false;
      }
    });
  }
}
