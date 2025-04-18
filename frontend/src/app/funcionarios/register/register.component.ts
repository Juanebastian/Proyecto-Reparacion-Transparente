// Importaciones necesarias desde Angular y los servicios personalizados
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';

// Decorador del componente
@Component({
  selector: 'app-register',                    // Selector del componente (para usar en HTML)
  standalone: true,                             // Es un componente standalone (Angular 14+)
  imports: [CommonModule, ReactiveFormsModule], // Módulos necesarios para este componente
  templateUrl: './register.component.html',     // Ruta al archivo HTML del componente
  styleUrls: ['./register.component.css']       // Ruta al archivo de estilos
})
export class RegisterComponent implements OnInit {

  // Declaración del formulario
  form!: FormGroup;

  // Variables para mostrar mensajes de éxito o error en el formulario
  errorMessage: string | null = null;
  successMessage: string | null = null;

  // Inyección de dependencias usando `inject()`
  private fb = inject(FormBuilder);         // Para crear formularios reactivos
  private userService = inject(UserService); // Servicio para registrar usuarios

  // Ciclo de vida: se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    // Inicialización del formulario con validaciones
    this.form = this.fb.group({
      nombre: ['', Validators.required],                        // Campo requerido
      email: ['', [Validators.required, Validators.email]],     // Requerido y formato de email
      password: ['', Validators.required],                      // Campo requerido
      rol: ['funcionario', Validators.required],                // Campo requerido
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    // Si el formulario no es válido, salir sin hacer nada
    if (this.form.invalid) return;
  
    // Llamada al servicio para registrar al usuario
    this.userService.registerUser(this.form.value).subscribe({
      next: (res) => {
        console.log('✅ Respuesta de la API:', res); // Log de la respuesta de la API

        // Si la respuesta indica éxito
        if (res.success) {
          this.successMessage = res.message; // Mostrar mensaje de éxito
          this.errorMessage = null;          // Limpiar mensaje de error
          this.form.reset();                 // Reiniciar formulario
        } else {
          // Si hubo un problema pero la respuesta no fue un error HTTP
          this.errorMessage = res.message || 'Hubo un problema al registrar.';
          this.successMessage = null;
        }
      },
      error: (err) => {
        // Si ocurre un error HTTP
        console.error('❌ Error al registrar:', err);
        this.errorMessage = err?.error?.message || 'Error inesperado al registrar.';
        this.successMessage = null;
      },
    });
  }

  // Método auxiliar para limpiar el formulario y los mensajes (útil al abrir/cerrar modal)
  resetFormAndMessages() {
    this.form.reset();            // Limpia los campos del formulario
    this.successMessage = null;  // Borra el mensaje de éxito
    this.errorMessage = null;    // Borra el mensaje de error
  }
}
