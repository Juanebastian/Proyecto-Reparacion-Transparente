import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isVisible$!: Observable<boolean>;
  
  menuItems = [
    { 
      title: 'Dashboard', 
      icon: 'bi-speedometer2', 
      link: '/dashboard', 
      submenu: [] 
    },
    {
      title: 'Usuarios',
      icon: 'bi-people',
      link: '/users',
      submenu: []
    },
    {
      title: 'Reportes',
      icon: 'bi-bar-chart',
      link: '',
      submenu: [
        { title: 'Ventas', link: '/reports/sales' },
        { title: 'Inventario', link: '/reports/inventory' },
        { title: 'Análisis', link: '/reports/analytics' }
      ]
    },
    {
      title: 'Configuración',
      icon: 'bi-gear',
      link: '/settings',
      submenu: []
    }
  ];

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.isVisible$ = this.sidebarService.sidebarVisible$;
  }
}