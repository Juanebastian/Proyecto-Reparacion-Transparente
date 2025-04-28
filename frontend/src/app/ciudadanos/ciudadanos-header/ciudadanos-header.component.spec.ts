import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadanosHeaderComponent } from './ciudadanos-header.component';

describe('CiudadanosHeaderComponent', () => {
  let component: CiudadanosHeaderComponent;
  let fixture: ComponentFixture<CiudadanosHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadanosHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiudadanosHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
