import { Routes } from '@angular/router';
import { FuncionariosLayoutComponent } from './funcionarios-layout.component';
import { ReportesComponent } from './reportes/reportes.component';
import { DashboardComponent } from './home/dashboard.component';


export default [
  {
    path: '',
    component: FuncionariosLayoutComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
] satisfies Routes;
