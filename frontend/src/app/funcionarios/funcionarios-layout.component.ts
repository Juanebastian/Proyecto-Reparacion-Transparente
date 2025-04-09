import { Component } from '@angular/core';
import { HeaderComponent } from "../core/components/header/header.component";
import { FooterComponent } from "../core/components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuncionariosSidebarComponent } from "./sidebar/funcionarios-sidebar.component";

@Component({
  selector: 'app-funcionarios-layout',
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterModule,
    FuncionariosSidebarComponent
],
  templateUrl: './funcionarios-layout.component.html',
  styleUrl: './funcionarios-layout.component.css'
})
export class FuncionariosLayoutComponent {
  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}