import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../core/components/header/header.component";
import { FooterComponent } from "../core/components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FuncionariosSidebarComponent } from "./sidebar/funcionarios-sidebar.component";
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-funcionarios-layout',
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterModule,
    FuncionariosSidebarComponent
],
  templateUrl: './funcionarios-layout.component.html',
  styleUrl: './funcionarios-layout.component.css'
})
export class FuncionariosLayoutComponent {
  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  private authService = inject(AuthService); // ✅ Inyecta el AuthService
  private router = inject(Router); // Por si necesitas redirigir
  ngOnInit(): void {
    const user = this.authService.getUserInfo();

    if (!user || user.rol !== 'funcionario') {
      console.warn('Acceso denegado: usuario no es administrador');
      this.authService.logout(); // 🔐 Cierra la sesión automáticamente
    }
  }
}