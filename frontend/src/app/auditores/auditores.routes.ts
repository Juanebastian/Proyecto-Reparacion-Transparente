import { Routes } from '@angular/router';
import { AuditoresLayoutComponent } from './auditores-layout.component';
import { DashboardComponent } from './home/dashboard.component';
import { ReportesComponent } from './reportes/reportes.component';
import { DenunciasComponent } from './denuncias/denuncias.component';

export default [
  {
    path: '',
    component: AuditoresLayoutComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'denuncias', component: DenunciasComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
] satisfies Routes;
