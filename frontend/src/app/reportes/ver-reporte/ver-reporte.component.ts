import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../core/services/report.service';

@Component({
  selector: 'app-ver-reporte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-reporte.component.html',
  styleUrls: ['./ver-reporte.component.scss']
})
export class VerReporteComponent {
  @Input() reporte: any;

  private reportService = inject(ReportService);

  cambiarEstado(nuevoEstado: 'aprobado' | 'rechazado') {
    if (!this.reporte || !this.reporte._id) return;

    this.reportService.updateReport(this.reporte._id, { estado: nuevoEstado }).subscribe({
      next: () => {
        this.reporte.estado = nuevoEstado;
        alert(`✅ Reportee ${nuevoEstado} correctamente.`);
      },
      error: (err) => {
        console.error(`❌ Error al actualizar estado:`, err);
        alert('Error al actualizar el estado del reporte');
      }
    });
  }
}
