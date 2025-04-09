import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
  
    this.userService.registerUser(this.form.value).subscribe({
      next: (res) => {
        console.log('✅ Respuesta de la API:', res); // Muestra la respuesta completa
  
        if (res.success) {
          this.successMessage = res.message; // Usamos el mensaje devuelto por la API
          this.errorMessage = null;
          this.form.reset();
        } else {
          this.errorMessage = res.message || 'Hubo un problema al registrar.';
          this.successMessage = null;
        }
      },
      error: (err) => {
        console.error('❌ Error al registrar:', err);
        this.errorMessage = err?.error?.message || 'Error inesperado al registrar.';
        this.successMessage = null;
      },
    });
  
  
    
  }
}
