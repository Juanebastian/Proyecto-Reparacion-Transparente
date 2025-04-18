import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReportService } from '../../core/services/report.service';
import { CommonModule } from '@angular/common';
import { VerReporteComponent } from "../../reportes/ver-reporte/ver-reporte.component";

// Permite usar objetos y eventos de Bootstrap JS
declare var bootstrap: any;

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule , VerReporteComponent],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit, AfterViewInit {
  reportes: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.cargarReportes(); // Cargar todos los reportes al iniciar
  }

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('crearReporteModal');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.cargarReportes(); // Recargar lista al cerrar el modal
      });
    }
  }

  cargarReportes() {
    this.loading = true;
    this.error = null;

    this.reportService.getAllReports().subscribe({
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

  selectedReporte: any = null;

abrirModalDetalles(reporte: any) {
  this.selectedReporte = reporte;
  const modalElement = document.getElementById('detalleReporteModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
}
