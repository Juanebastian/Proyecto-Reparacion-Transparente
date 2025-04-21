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
