import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule] // Importa ReactiveFormsModule  aquí
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      this.authService.login(email, password).subscribe({
        next: () => {
          const user = this.authService.getUserInfo(); // obtenemos el usuario almacenado
  
          if (user?.rol === 'admin') {
            this.router.navigate(['/administrador']);
          } else if (user?.rol === 'funcionario') {
            this.router.navigate(['/funcionarios']);
          } else {
            this.errorMessage = 'Rol no autorizado.';
          }
        },
        error: err => {
          console.error('Error recibido en el componente:', err);
          this.errorMessage = err.message || 'Error al iniciar sesión';
        }
      });
    }
  }
  
  

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/administrador/home']);
    }
  }


}
