import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from 'express';
import { CiudadanosHeaderComponent } from "./ciudadanos-header/ciudadanos-header.component";
import { CiudadanosFooterComponent } from "./ciudadanos-footer/ciudadanos-footer.component";

@Component({
  selector: 'app-ciudadanos',
  imports: [RouterModule, CiudadanosHeaderComponent, CiudadanosFooterComponent],
  templateUrl: './ciudadanos.component.html',
  styleUrl: './ciudadanos.component.scss'
})
export class CiudadanosComponent {

}
