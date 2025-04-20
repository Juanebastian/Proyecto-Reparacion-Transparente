import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AdminSidebarComponent } from "./sidebar/admin-sidebar.component";
import { HeaderComponent } from "../core/components/header/header.component";
import { FooterComponent } from "../core/components/footer/footer.component";
import { AuthService } from '../core/services/auth.service';


@Component({
  standalone: true,
  selector: 'app-admin-layout',
  imports: [
    CommonModule,
    RouterModule,
    AdminSidebarComponent,
    HeaderComponent,
    FooterComponent
],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  isSidebarOpen = true;

  private authService = inject(AuthService); // ✅ Inyecta el AuthService
  private router = inject(Router); // Por si necesitas redirigir
  
  ngOnInit(): void {
    const user = this.authService.getUserInfo();

    if (!user || user.rol !== 'administrador') {
      console.warn('Acceso denegado: usuario no es administrador');
      this.authService.logout(); // 🔐 Cierra la sesión automáticamente
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}