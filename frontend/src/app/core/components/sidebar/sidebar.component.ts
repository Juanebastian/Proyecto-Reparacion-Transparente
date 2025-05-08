import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface NavItem {
  path: string;
  icon: string;
  label: string;
  exact?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = true;

  private authService = inject(AuthService);

  title: string = '';
  navItems: NavItem[] = [];

  ngOnInit(): void {
    const user = this.authService.getUserInfo();

    if (!user) {
      this.title = 'Panel de Usuario';
      this.navItems = [
        { path: '/dashboard', icon: 'bi bi-speedometer', label: 'Dashboard', exact: true }
        // Puedes agregar opciones por defecto aquí si el usuario no está autenticado
      ];
    } else if (user.rol === 'administrador') {
      this.title = 'Panel Administrador';
      this.navItems = [
        { path: '/administrador', icon: 'bi bi-speedometer', label: 'Dashboard', exact: true },
        { path: '/administrador/funcionarios', icon: 'bi bi-person-badge', label: 'Funcionarios' },
        { path: '/administrador/auditores', icon: 'bi bi-person-lines-fill', label: 'Auditores' },
        { path: '/administrador/reportes', icon: 'bi bi-bar-chart-line', label: 'Reportes' },
        { path: '/administrador/denuncias', icon: 'bi bi-flag', label: 'Denuncias' }
      ];
    } else if (user.rol === 'funcionario') {
      this.title = 'Panel Funcionario';
      this.navItems = [
        { path: '/funcionarios', icon: 'bi bi-speedometer', label: 'Dashboard', exact: true },
        { path: '/funcionarios/reportes', icon: 'bi bi-bar-chart-line', label: 'Reportes' }
      ];
    }
    else if (user.rol === 'auditor') {
      this.title = 'Panel Auditores';
      this.navItems = [
        { path: '/auditores', icon: 'bi bi-speedometer', label: 'Dashboard', exact: true },
        { path: '/auditores/reportes', icon: 'bi bi-bar-chart-line', label: 'Reportes' },
        { path: '/auditores/denuncias', icon: 'bi bi-flag', label: 'Denuncias' }
      ];
    } else {
      // Rol no reconocido, puedes personalizar esta sección
      this.title = 'Panel';
      this.navItems = [
        { path: '/dashboard', icon: 'bi bi-speedometer', label: 'Dashboard', exact: true }
      ];
    }
  }
}
