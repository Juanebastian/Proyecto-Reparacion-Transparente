import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  nombreUsuario: string = 'Admin';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUserInfo();
    if (user && user.nombreUsuario) {
      this.nombreUsuario = user.nombreUsuario;
    }
  }
  cerrarSesion() {
    this.authService.logout(); // 👈 Aquí se ejecuta el cierre de sesión
  }
}
