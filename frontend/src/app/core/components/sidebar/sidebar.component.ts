import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

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
export class SidebarComponent {
  @Input() isOpen = true;

  title: string = 'Panel Administrador'; // ← Variable para el título
  navItems: NavItem[] = [
    { path: '/administrador', icon: 'bi bi-speedometer', label: 'Dashboard', exact: true },
    { path: '/administrador/funcionarios', icon: 'bi bi-person-badge', label: 'Funcionarios' },
    { path: '/administrador/auditores', icon: 'bi bi-person-lines-fill', label: 'Auditores' },
    { path: '/administrador/reportes', icon: 'bi bi-bar-chart-line', label: 'Reportes' },
    { path: '/administrador/denuncias', icon: 'bi bi-flag', label: 'Denuncias' }
  ];
}
