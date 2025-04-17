import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-denuncia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-denuncia.component.html',
  styleUrls: ['./ver-denuncia.component.scss']
})
export class VerDenunciaComponent {
  @Input() denuncia: any;
}
