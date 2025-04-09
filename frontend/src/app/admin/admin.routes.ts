import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { AuditoresComponent } from './auditores/auditores.component';
import { ReportesComponent } from './reportes/reportes.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { DashboardComponent } from './home/dashboard.component';

export default [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'funcionarios', component: FuncionariosComponent },
      { path: 'auditores', component: AuditoresComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'denuncias', component: DenunciasComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
] satisfies Routes;
