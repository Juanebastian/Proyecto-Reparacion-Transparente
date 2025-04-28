import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadanosLayoutComponent } from './ciudadanos-layout.component';

describe('CiudadanosLayoutComponent', () => {
  let component: CiudadanosLayoutComponent;
  let fixture: ComponentFixture<CiudadanosLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadanosLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiudadanosLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
