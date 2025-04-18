import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { ReportService } from '../../core/services/report.service';
import { ComplaintService } from '../../core/services/complaint.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalFuncionarios = 0;
  totalAuditores = 0;
  totalReportes = 0;
  totalDenuncias = 0;

  dashboardCards: any[] = [];

  constructor(
    private userService: UserService,
    private reportService: ReportService,
    private denunciaService: ComplaintService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.userService.getFuncionarios().subscribe({
      next: (res) => {
        this.totalFuncionarios = res.data.length;
        this.actualizarDashboard();
      },
      error: (err) => console.error('Error cargando funcionarios', err)
    });

    this.userService.getAuditores().subscribe({
      next: (res) => {
        this.totalAuditores = res.data.length;
        this.actualizarDashboard();
      },
      error: (err) => console.error('Error cargando auditores', err)
    });

    this.reportService.getAllReports().subscribe({
      next: (res) => {
        this.totalReportes = Array.isArray(res.data) ? res.data.length : res.length;
        this.actualizarDashboard();
      },
      error: (err) => console.error('Error cargando reportes', err)
    });

    this.denunciaService.getAllComplaints().subscribe({
      next: (res) => {
        this.totalDenuncias = Array.isArray(res.data) ? res.data.length : res.length;
        this.actualizarDashboard();
      },
      error: (err) => console.error('Error cargando denuncias', err)
    });
  }

  actualizarDashboard() {
    this.dashboardCards = [
      {
        title: 'Total Funcionarios',
        total: this.totalFuncionarios,
        description: 'Funcionarios registrados',
        icon: 'ti ti-users',
        iconBg: 'bg-primary',
        trend: '+8% respecto al mes anterior',
        trendIcon: 'ti ti-trending-up'
      },
      {
        title: 'Total Auditores',
        total: this.totalAuditores,
        description: 'Auditores activos',
        icon: 'ti ti-shield-check',
        iconBg: 'bg-success',
        trend: '+5% este mes',
        trendIcon: 'ti ti-trending-up'
      },
      {
        title: 'Total Reportes',
        total: this.totalReportes,
        description: 'Reportes generados',
        icon: 'ti ti-file-description',
        iconBg: 'bg-warning',
        trend: '-3% esta semana',
        trendIcon: 'ti ti-trending-down'
      },
      {
        title: 'Total Denuncias',
        total: this.totalDenuncias,
        description: 'Denuncias recibidas',
        icon: 'ti ti-alert-circle',
        iconBg: 'bg-danger',
        trend: 'Sin cambios',
        trendIcon: 'ti ti-arrows-left-right'
      }
    ];
  }
  
}
