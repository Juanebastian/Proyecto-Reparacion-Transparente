// register.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComplaintService } from '../../core/services/complaint.service';
import { AuthService } from '../../core/services/auth.service';  // ← importa tu AuthService

declare var bootstrap: any;

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

  @Output() denunciaRegistrada = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService,
    private authService: AuthService        // ← inyecta AuthService
  ) {
    this.denunciaForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      anonimo: [false],
      usuario_id: ['']
    });
  }

  get f(): any {
    return this.denunciaForm.controls;
  }

  resetFormAndMessages() {
    this.denunciaForm.reset({ anonimo: false }); // Reinicia el formulario con anonimo en false
    this.submitted = false;
    this.mensaje = null;
    this.error = null;
  }

  enviarDenuncia() {
    this.submitted = true;
    this.mensaje = null;
    this.error = null;

    if (this.denunciaForm.invalid) {
      return;
    }

    // Copia de valores del formulario
    const formValue: any = { ...this.denunciaForm.value };

    if (formValue.anonimo) {
      // Usuario anónimo: puedes dejar el id vacío o colocar uno genérico
      formValue.usuario_id = "67e509c84e1d2359bd12fcb2";
    } else {
      // Usuario autenticado: lo sacamos de AuthService
      const userId = this.authService.getUserId();
      formValue.usuario_id = userId;
    }

    this.loading = true;
    this.complaintService.createComplaint(formValue).subscribe({
      next: () => {
        this.loading = false;
        this.mensaje = '✅ Denuncia registrada correctamente.';
        setTimeout(() => {
          this.denunciaForm.reset({ anonimo: false });
          this.submitted = false;
          this.mensaje = null;
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
