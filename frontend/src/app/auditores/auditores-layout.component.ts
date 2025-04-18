import { Component } from '@angular/core';
import { FooterComponent } from "../core/components/footer/footer.component";
import { HeaderComponent } from "../core/components/header/header.component";
import { AuditoresSidebarComponent } from "./sidebar/auditores-sidebar.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auditores-layout',
  imports: [FooterComponent, 
    HeaderComponent, 
    AuditoresSidebarComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './auditores-layout.component.html',
  styleUrl: './auditores-layout.component.scss'
})
export class AuditoresLayoutComponent {
  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
