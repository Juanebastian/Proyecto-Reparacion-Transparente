import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintService } from '../../core/services/complaint.service';
import { VerDenunciaComponent } from "../../denuncias/ver-denuncia/ver-denuncia.component";
import { RegisterComponent } from "../../denuncias/register/register.component";

declare var bootstrap: any;

@Component({
  selector: 'app-denuncias',
  standalone: true,
  imports: [CommonModule, VerDenunciaComponent, RegisterComponent],
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.scss']
})
export class DenunciasComponent implements OnInit, AfterViewInit {

  @ViewChild(RegisterComponent) registerComponent!: RegisterComponent;

  denuncias: any[] = [];
  loading = false;
  error: string | null = null;
  selectedDenuncia: any = null;

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void {
    this.cargarDenuncias();
  }

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('crearDenunciaModal');

    if (modalElement) {
      // Cuando se abre el modal, reiniciar el formulario
      modalElement.addEventListener('show.bs.modal', () => {
        this.registerComponent.resetFormAndMessages?.();
      });

      // Cuando se cierra el modal, recargar la lista
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.cargarDenuncias();
      });
    }
  }

  cargarDenuncias() {
    this.loading = true;
    this.error = null;

    this.complaintService.getAllComplaints().subscribe({
      next: (data) => {
        this.denuncias = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar denuncias:', err);
        this.error = 'Error al cargar denuncias';
        this.loading = false;
      }
    });
  }

  abrirModalDetalles(denuncia: any) {
    this.selectedDenuncia = denuncia;
    const modalElement = document.getElementById('detalleDenunciaModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

}
