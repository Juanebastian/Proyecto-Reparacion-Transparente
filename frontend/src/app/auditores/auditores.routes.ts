import { Routes } from '@angular/router';
import { AuditoresLayoutComponent } from './auditores-layout.component';
import { DashboardComponent } from './home/dashboard.component';

export default [
  {
    path: '',
    component: AuditoresLayoutComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
] satisfies Routes;
