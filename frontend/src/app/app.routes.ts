import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    //{ path: 'funcionarios', component: FuncionariosLayoutComponent },
    {
      path: 'administrador',
      canActivate: [AuthGuard],
      loadChildren: () => import('./admin/admin.routes') // ya no uses `.then(m => m.adminRoutes)`
    },
    {
      path: 'funcionarios',
      canActivate: [AuthGuard],
      loadChildren: () => import('./funcionarios/funcionarios.routes') // ya no uses `.then(m => m.adminRoutes)`
    }
  ];
  