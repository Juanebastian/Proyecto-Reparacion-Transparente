import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { forkJoin } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { ReportService } from '../../core/services/report.service';
import { ComplaintService } from '../../core/services/complaint.service';

interface DashboardCard {
  title: string;
  total: number;
  description: string;
  icon: string;
  iconBg: string;
  trend: string;
  trendIcon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalFuncionarios = 0;
  totalAuditores = 0;
  totalReportes = 0;
  totalDenuncias = 0;

  dashboardCards: DashboardCard[] = [];

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  };

  barChartLabels: string[] = ['Funcionarios', 'Auditores', 'Reportes', 'Denuncias'];
  barChartData: ChartConfiguration['data']['datasets'] = [{
    data: [0, 0, 0, 0],
    label: 'Totales',
    backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545'],
  }];

  donutChartLabels: string[] = this.barChartLabels;
  donutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: this.donutChartLabels,
    datasets: [{
      data: [0, 0, 0, 0],
      backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545'],
    }]
  };

  donutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: {
        display: true,
        text: 'Distribución General',
      }
    }
  };

  constructor(
    private readonly userService: UserService,
    private readonly reportService: ReportService,
    private readonly complaintService: ComplaintService
  ) {}
  ngOnInit(): void {
    this.loadDashboardData();
  }



  private loadDashboardData(): void {
    forkJoin({
      funcionarios: this.userService.getFuncionarios(),
      auditores: this.userService.getAuditores(),
      reportes: this.reportService.getAllReports(),
      denuncias: this.complaintService.getAllComplaints()
    }).subscribe({
      next: ({ funcionarios, auditores, reportes, denuncias }) => {
        this.totalFuncionarios = funcionarios.data.length;
        this.totalAuditores = auditores.data.length;
        this.totalReportes = Array.isArray(reportes.data) ? reportes.data.length : reportes.length;
        this.totalDenuncias = Array.isArray(denuncias.data) ? denuncias.data.length : denuncias.length;

        this.updateDashboard();
      },
      error: (err) => console.error('Error al cargar los datos del dashboard:', err)
    });
  }

  private updateDashboard(): void {
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

    const data = [
      this.totalFuncionarios,
      this.totalAuditores,
      this.totalReportes,
      this.totalDenuncias,
    ];

    this.barChartData[0].data = data;
    this.donutChartData.datasets[0].data = data;
  }
}
