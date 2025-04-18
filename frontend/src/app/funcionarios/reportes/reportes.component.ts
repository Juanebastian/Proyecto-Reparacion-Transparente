// Importaciones necesarias desde Angular y tus servicios/componentes
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReportService } from '../../core/services/report.service'; // Servicio que trae los reportes del backend
import { AuthService } from '../../core/services/auth.service'; // Servicio de autenticación (para obtener el ID del usuario)
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "../../reportes/register/register.component"; // Componente de formulario para registrar reportes

// Permite usar objetos y eventos de Bootstrap JS
declare var bootstrap: any;

@Component({
  selector: 'app-reportes', // Selector del componente (se usa como etiqueta <app-reportes>)
  standalone: true, // Es un componente independiente (sin necesidad de un módulo)
  imports: [CommonModule, RegisterComponent], // Importación de módulos necesarios
  templateUrl: './reportes.component.html', // Ruta al archivo HTML
  styleUrls: ['./reportes.component.scss'] // Ruta a los estilos SCSS del componente
})
export class ReportesComponent implements OnInit, AfterViewInit {
  // Lista donde se almacenarán los reportes obtenidos
  reportes: any[] = [];

  // Indicador de carga (se muestra mientras se obtienen los datos)
  loading = false;

  // Variable para mostrar errores en pantalla (si ocurre algún problema)
  error: string | null = null;

  constructor(
    private reportService: ReportService, // Inyección del servicio de reportes
    private authService: AuthService // Inyección del servicio de autenticación
  ) {}

  // Se ejecuta una vez al inicializar el componente
  ngOnInit(): void {
    this.cargarReportes(); // Carga los reportes al iniciar
  }

  // Se ejecuta cuando la vista del componente ya fue cargada en el DOM
  ngAfterViewInit(): void {
    // Se obtiene el elemento del modal por su ID (Bootstrap lo necesita así)
    const modalElement = document.getElementById('crearReporteModal');

    // Si el modal existe, le agregamos un "listener" al evento cuando se cierra
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        // 👉 Cuando el modal se cierra, volvemos a cargar los reportes
        this.cargarReportes();

        // Alternativamente, se podría recargar toda la página:
        // window.location.reload();
      });
    }
  }

  // Función para obtener los reportes del usuario autenticado
  cargarReportes() {
    this.loading = true; // Mostrar el estado de carga

    // Obtenemos el ID del usuario actual desde el AuthService
    const userId = this.authService.getUserId();

    // Si no hay usuario (no autenticado), mostramos error
    if (!userId) {
      this.error = 'Usuario no autenticado';
      this.loading = false;
      return;
    }

    // Llamamos al servicio para traer los reportes por ID de usuario
    this.reportService.getReportsByUser(userId).subscribe({
      next: (data) => {
        // Si todo va bien, guardamos los datos en el array
        this.reportes = data;
        this.loading = false;
      },
      error: (err) => {
        // Si hay un error, lo mostramos en consola y en pantalla
        console.error('Error al cargar reportes:', err);
        this.error = 'Error al cargar reportes';
        this.loading = false;
      }
    });
  }
}
