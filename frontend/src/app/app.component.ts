import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InactivityService } from './core/services/inactivity.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reparacion-transparente';
  constructor(private inactivityService: InactivityService) {}
}
