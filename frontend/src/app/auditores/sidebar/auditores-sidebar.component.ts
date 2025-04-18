import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auditores-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './auditores-sidebar.component.html',
  styleUrl: './auditores-sidebar.component.scss'
})
export class AuditoresSidebarComponent {
  @Input() isOpen: boolean = true;
}
