import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  private timeoutId: any;
  private readonly idleTime = 2 * 60 * 1000; // 2 minutos

  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    this.initListeners();
    this.resetTimer();
  }

  private initListeners(): void {
    if (typeof window === 'undefined') return; // 🔐 Previene error en SSR

    const events = ['mousemove', 'mousedown', 'keypress', 'touchstart', 'scroll'];

    events.forEach(event => {
      window.addEventListener(event, () => this.resetTimer());
    });
  }

  private resetTimer(): void {
    if (typeof window === 'undefined') return;

    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      console.warn('Usuario inactivo. Cerrando sesión...');
      this.authService.logout();
    }, this.idleTime);
  }
}
