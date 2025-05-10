import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  hide() {
    throw new Error('Method not implemented.');
  }
  private sidebarVisibleSubject = new BehaviorSubject<boolean>(true);
  sidebarVisible$ = this.sidebarVisibleSubject.asObservable();

  constructor() { }

  toggleSidebar() {
    this.sidebarVisibleSubject.next(!this.sidebarVisibleSubject.value);
  }

  showSidebar() {
    this.sidebarVisibleSubject.next(true);
  }

  hideSidebar() {
    this.sidebarVisibleSubject.next(false);
  }
}
