import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComplaintService } from '../../core/services/complaint.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  denunciaForm: FormGroup;
  submitted = false;
  mensaje: string | null = null;
  error: string | null = null;
  loading = false;
  archivoSeleccionado: File | null = null;

  @Output() denunciaRegistrada = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService,
    private authService: AuthService
  ) {
    this.denunciaForm = this.fb.group({
      asunto: ['', [Validators.required, Validators.minLength(5)]], // Asunto
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      anonimo: [false],
      usuario_id: ['']
    });
  }

  get f(): any {
    return this.denunciaForm.controls;
  }

  onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0];
    }
  }

  resetFormAndMessages(): void {
    this.denunciaForm.reset({ anonimo: false });
    this.submitted = false;
    this.mensaje = null;
    this.error = null;
    this.archivoSeleccionado = null;
  }

  enviarDenuncia(): void {
    this.submitted = true;
    this.mensaje = null;
    this.error = null;

    if (this.denunciaForm.invalid) return;

    const formValue = this.denunciaForm.value;

    const userId = formValue.anonimo
      ? '67e509c84e1d2359bd12fcb2'
      : this.authService.getUserId() ?? '';

    const formData = new FormData();
    formData.append('asunto', formValue.asunto ?? '');
    formData.append('descripcion', formValue.descripcion ?? '');
    formData.append('anonimo', String(formValue.anonimo));
    formData.append('usuario_id', userId);

    if (this.archivoSeleccionado) {
      formData.append('file', this.archivoSeleccionado);
    }

    this.loading = true;
    this.complaintService.uploadComplaint(formData).subscribe({
      next: () => {
        this.loading = false;
        this.mensaje = '✅ Denuncia registrada correctamente.';
        setTimeout(() => {
          this.resetFormAndMessages();
          this.denunciaRegistrada.emit();
        }, 2000);
      },
      error: (err) => {
        console.error('Error al registrar denuncia:', err);
        this.loading = false;
        this.error = '❌ Error al registrar la denuncia. Intenta de nuevo.';
      }
    });
  }
}
