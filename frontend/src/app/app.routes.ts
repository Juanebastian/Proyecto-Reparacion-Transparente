import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { CiudadanosComponent } from './ciudadanos/ciudadanos.component';


export const routes: Routes = [
    { path: '', redirectTo: 'ciudadanos', pathMatch: 'full' }, // 👈 Ruta por defecto
    { path: 'ciudadanos', component: CiudadanosComponent },
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
  