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
    

    

    this.reportService.getAllReports().subscribe({
      next: (res) => {
        this.totalReportes = Array.isArray(res.data) ? res.data.length : res.length;
        this.actualizarDashboard();
      },
      error: (err) => console.error('Error cargando reportes', err)
    });

    
  }

  actualizarDashboard() {
    this.dashboardCards = [
      
      
      {
        title: 'Total Reportes',
        total: this.totalReportes,
        description: 'Reportes generados',
        icon: 'ti ti-file-description',
        iconBg: 'bg-warning',
        trend: '-3% esta semana',
        trendIcon: 'ti ti-trending-down'
      },
      
    ];
  }
  
}
