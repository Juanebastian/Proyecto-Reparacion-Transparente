import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../core/services/sidebar.service';
import { AuthService } from '../../core/services/auth.service';
import { Output as AngularOutput } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  nombreUsuario: string = 'Admin';
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserInfo();
    if (user && user.nombreUsuario) {
      this.nombreUsuario = user.nombreUsuario;
    }
  }

  cerrarSesion() {
    this.authService.logout();
  }
}



