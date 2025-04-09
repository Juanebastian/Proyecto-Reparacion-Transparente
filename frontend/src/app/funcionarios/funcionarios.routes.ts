import { Routes } from '@angular/router';
import { FuncionariosLayoutComponent } from './funcionarios-layout.component';
import { ReportesComponent } from './reportes/reportes.component';


export default [
  {
    path: '',
    component: FuncionariosLayoutComponent,
    children: [
      { path: 'home', component: ReportesComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
] satisfies Routes;
