import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-funcionarios-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './funcionarios-sidebar.component.html',
  styleUrl: './funcionarios-sidebar.component.scss'
})
export class FuncionariosSidebarComponent {
  @Input() isOpen: boolean = true;
}
