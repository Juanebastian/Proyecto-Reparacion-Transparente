import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';
import { AuthService } from '../../core/services/auth.service';


interface MenuItem {
  title: string;
  icon: string;
  link: string;
  submenu: { title: string; link: string }[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isVisible$!: Observable<boolean>;
  menuItems: MenuItem[] = [];
  title: string = '';

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isVisible$ = this.sidebarService.sidebarVisible$;

    const user = this.authService.getUserInfo();

    if (!user) {
      this.title = 'Panel de Usuario';
      this.menuItems = [
        { title: 'Dashboard', icon: 'bi-speedometer2', link: '/dashboard', submenu: [] }
      ];
    } else if (user.rol === 'administrador') {
      this.title = 'Panel Administrador';
      this.menuItems = [
        { title: 'Dashboard', icon: 'bi-speedometer2', link: '/administrador', submenu: [] },
        { title: 'Funcionarios', icon: 'bi-person-badge', link: '/administrador/funcionarios', submenu: [] },
        { title: 'Auditores', icon: 'bi-person-lines-fill', link: '/administrador/auditores', submenu: [] },
        {
          title: 'Reportes',
          icon: 'bi-bar-chart-line',
          link: '',
          submenu: [
            { title: 'General', link: '/administrador/reportes' }
          ]
        },
        { title: 'Denuncias', icon: 'bi-flag', link: '/administrador/denuncias', submenu: [] }
      ];
    } else if (user.rol === 'funcionario') {
      this.title = 'Panel Funcionario';
      this.menuItems = [
        { title: 'Dashboard', icon: 'bi-speedometer2', link: '/funcionarios', submenu: [] },
        {
          title: 'Reportes',
          icon: 'bi-bar-chart-line',
          link: '',
          submenu: [
            { title: 'General', link: '/funcionarios/reportes' }
          ]
        }
      ];
    } else if (user.rol === 'auditor') {
      this.title = 'Panel Auditores';
      this.menuItems = [
        { title: 'Dashboard', icon: 'bi-speedometer2', link: '/auditores', submenu: [] },
        {
          title: 'Reportes',
          icon: 'bi-bar-chart-line',
          link: '',
          submenu: [
            { title: 'General', link: '/auditores/reportes' }
          ]
        },
        { title: 'Denuncias', icon: 'bi-flag', link: '/auditores/denuncias', submenu: [] }
      ];
    } else {
      this.title = 'Panel';
      this.menuItems = [
        { title: 'Dashboard', icon: 'bi-speedometer2', link: '/dashboard', submenu: [] }
      ];
    }
  }

 
}
