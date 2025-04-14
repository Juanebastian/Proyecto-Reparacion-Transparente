import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoresSidebarComponent } from './auditores-sidebar.component';

describe('AuditoresSidebarComponent', () => {
  let component: AuditoresSidebarComponent;
  let fixture: ComponentFixture<AuditoresSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditoresSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditoresSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
