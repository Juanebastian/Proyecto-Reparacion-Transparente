import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { RegisterComponent } from '../../auditores/register/register.component';


@Component({
  selector: 'app-auditores',
  standalone: true,
  imports: [CommonModule, RegisterComponent],
  templateUrl: './auditores.component.html',
  styleUrls: ['./auditores.component.scss']
})
export class AuditoresComponent implements OnInit, AfterViewInit {

  @ViewChild(RegisterComponent) registerComponent!: RegisterComponent;

  private userService = inject(UserService);

  auditores: any[] = [];

  ngOnInit(): void {
    this.cargarAuditores();
  }

  cargarAuditores() {
    this.userService.getAuditores().subscribe({
      next: (res) => {
        console.log('✅ Auditores:', res);
        this.auditores = res.data;
      },
      error: (err) => {
        console.error('❌ Error al cargar auditores:', err);
      }
    });
  }

  ngAfterViewInit(): void {
    const modalEl = document.getElementById('registerModal');
    if (modalEl) {
      modalEl.addEventListener('show.bs.modal', () => {
        this.registerComponent.resetFormAndMessages();
      });

      modalEl.addEventListener('hidden.bs.modal', () => {
        this.cargarAuditores();
      });
    }
  }
}
