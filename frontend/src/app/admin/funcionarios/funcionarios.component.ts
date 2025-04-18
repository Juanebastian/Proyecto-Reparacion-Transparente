// Importaciones necesarias desde Angular y el proyecto
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../core/services/user.service';               // Servicio para manejar usuarios
import { RegisterComponent } from '../../funcionarios/register/register.component'; // Componente de registro de funcionario (modal)

// Decorador del componente
@Component({
  selector: 'app-funcionarios',                            // Selector del componente
  standalone: true,                                        // Componente standalone
  imports: [CommonModule, RegisterComponent],              // Módulos/componentes que se importan
  templateUrl: './funcionarios.component.html',            // Plantilla HTML asociada
  styleUrls: ['./funcionarios.component.scss']             // Estilos del componente
})
export class FuncionariosComponent implements OnInit, AfterViewInit {

  // Referencia al componente de registro dentro de la vista (usado para acceder a sus métodos)
  @ViewChild(RegisterComponent) registerComponent!: RegisterComponent;

  // Inyección del servicio de usuarios
  private userService = inject(UserService);

  // Lista de funcionarios que se mostrará en pantalla
  funcionarios: any[] = [];

  // Ciclo de vida: se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.cargarFuncionarios(); // Cargar los funcionarios desde la API
  }

  // Método para obtener la lista de funcionarios desde el backend
  cargarFuncionarios() {
    this.userService.getFuncionarios().subscribe({
      next: (res) => {
        console.log('✅ Funcionarios:', res); // Log de la respuesta
        this.funcionarios = res.data;         // Asigna los datos a la variable del componente
      },
      error: (err) => {
        console.error('❌ Error al cargar funcionarios:', err); // Muestra el error si algo falla
      }
    });
  }

  // Ciclo de vida: se ejecuta después de que la vista ha sido inicializada
  ngAfterViewInit(): void {
    // Obtener la referencia al modal por su ID en el DOM
    const modalEl = document.getElementById('registerModal');

    if (modalEl) {
      // Cuando se abre el modal, reinicia el formulario y limpia mensajes
      modalEl.addEventListener('show.bs.modal', () => {
        this.registerComponent.resetFormAndMessages();
      });

      // Cuando se cierra el modal, recarga la lista de funcionarios
      modalEl.addEventListener('hidden.bs.modal', () => {
        this.cargarFuncionarios();
      });
    }
  }
}
