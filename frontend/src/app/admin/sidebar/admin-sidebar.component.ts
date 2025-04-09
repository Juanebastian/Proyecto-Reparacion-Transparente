import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'] // <-- ¡También aquí era `styleUrls`, no `styleUrl`!
})
export class AdminSidebarComponent {
  @Input() isOpen: boolean = true;
}
