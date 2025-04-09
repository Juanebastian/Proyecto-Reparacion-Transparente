import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoresComponent } from './auditores.component';

describe('AuditoresComponent', () => {
  let component: AuditoresComponent;
  let fixture: ComponentFixture<AuditoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
