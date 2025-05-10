import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../core/services/sidebar.service';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@Component({
  standalone: true,
  selector: 'app-admin-layout',
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent
  ],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  constructor(public sidebarService: SidebarService) {}
}