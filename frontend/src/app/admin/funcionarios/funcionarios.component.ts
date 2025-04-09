import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../../auth/register/register.component';
import { UserService } from '../../core/services/user.service';


@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [CommonModule, RegisterComponent],
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {

  private userService = inject(UserService);
  funcionarios: any[] = [];

  ngOnInit(): void {
    this.cargarFuncionarios();
  }

  cargarFuncionarios() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        console.log('✅ Usuarios:', res);
        this.funcionarios = res.data;
      },
      error: (err) => {
        console.error('❌ Error al cargar funcionarios:', err);
      }
    });
  }
}
