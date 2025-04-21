import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../core/services/report.service';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  selectedFile: File | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

 
  
  private fb = inject(FormBuilder);
  private reportService = inject(ReportService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      zona: ['', Validators.required],
      estado: ['pendiente', Validators.required],
      valor: ['', Validators.required], // ✅ Agregado aquí
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.form.invalid || !this.selectedFile) {
      this.errorMessage = 'Completa todos los campos y selecciona un archivo.';
      return;
    }

    const usuario_id = this.authService.getUserId();
    if (!usuario_id) {
      this.errorMessage = 'No se pudo obtener el ID del usuario.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('descripcion', this.form.value.descripcion);
    formData.append('zona', this.form.value.zona);
    formData.append('estado', this.form.value.estado);
    formData.append('valor', this.form.value.valor);
    formData.append('usuario_id', usuario_id);

    this.loading = true;

    this.reportService.createReportWithFile(formData).subscribe({
      next: (res: { message: string }) => {
        this.successMessage = res.message || 'Reporte creado exitosamente.';
        this.errorMessage = null;
        this.form.reset({ estado: 'pendiente' });
        this.selectedFile = null;
        this.loading = false;
      },
      error: (err: { error: { message: string } }) => {
        this.errorMessage = err?.error?.message || 'Error al crear el reporte.';
        this.successMessage = null;
        this.loading = false;
      },
    });
  }

  zonasColombia: string[] = [
    'Amazonas - Leticia',
    'Antioquia - Medellín',
    'Arauca - Arauca',
    'Atlántico - Barranquilla',
    'Bolívar - Cartagena',
    'Boyacá - Tunja',
    'Caldas - Manizales',
    'Caquetá - Florencia',
    'Casanare - Yopal',
    'Cauca - Popayán',
    'Cesar - Valledupar',
    'Chocó - Quibdó',
    'Córdoba - Montería',
    'Cundinamarca - Bogotá',
    'Guainía - Inírida',
    'Guaviare - San José del Guaviare',
    'Huila - Neiva',
    'La Guajira - Riohacha',
    'Magdalena - Santa Marta',
    'Meta - Villavicencio',
    'Nariño - Pasto',
    'Norte de Santander - Cúcuta',
    'Putumayo - Mocoa',
    'Quindío - Armenia',
    'Risaralda - Pereira',
    'San Andrés y Providencia - San Andrés',
    'Santander - Bucaramanga',
    'Sucre - Sincelejo',
    'Tolima - Ibagué',
    'Valle del Cauca - Cali',
    'Vaupés - Mitú',
    'Vichada - Puerto Carreño',
  ];
  
}
