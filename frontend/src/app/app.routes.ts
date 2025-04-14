import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
      path: 'administrador',
      canActivate: [AuthGuard],
      loadChildren: () => import('./admin/admin.routes') 
    },
    {
      path: 'funcionarios',
      canActivate: [AuthGuard],
      loadChildren: () => import('./funcionarios/funcionarios.routes') 
    },
    {
      path: 'auditores',
      canActivate: [AuthGuard],
      loadChildren: () => import('./auditores/auditores.routes') 
    }
  ];
  