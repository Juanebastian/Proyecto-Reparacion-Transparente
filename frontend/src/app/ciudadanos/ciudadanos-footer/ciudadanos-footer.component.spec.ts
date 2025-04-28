import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadanosFooterComponent } from './ciudadanos-footer.component';

describe('CiudadanosFooterComponent', () => {
  let component: CiudadanosFooterComponent;
  let fixture: ComponentFixture<CiudadanosFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadanosFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiudadanosFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
