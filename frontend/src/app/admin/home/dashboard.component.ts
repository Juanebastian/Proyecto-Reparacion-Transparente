import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  resumen = [
    {
      icon: 'bi-person-badge',
      titulo: 'Funcionarios',
      valor: '4,42,236',
      cambio: 59.3,
      color: 'primary'
    },
    {
      icon: 'bi-people-fill',
      titulo: 'Auditores',
      valor: '78,250',
      cambio: 70.5,
      color: 'success'
    },
    {
      icon: 'bi-bar-chart-line',
      titulo: 'Reportes',
      valor: '18,800',
      cambio: -27.4,
      color: 'warning'
    },
    {
      icon: 'bi-exclamation-triangle-fill',
      titulo: 'Denuncias',
      valor: '$35,078',
      cambio: -27.4,
      color: 'danger'
    }
  ];

  ultimasDenuncias = [
    { id: 'DEN-001', titulo: 'Uso indebido de recursos', fecha: '04/04/2025', estado: 'Pendiente' },
    { id: 'DEN-002', titulo: 'Corrupción administrativa', fecha: '03/04/2025', estado: 'Investigando' },
    { id: 'DEN-003', titulo: 'Nepotismo', fecha: '02/04/2025', estado: 'Resuelto' }
  ];
}
