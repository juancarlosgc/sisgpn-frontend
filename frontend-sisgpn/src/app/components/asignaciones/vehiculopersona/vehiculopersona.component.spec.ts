import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculopersonaComponent } from './vehiculopersona.component';

describe('VehiculopersonaComponent', () => {
  let component: VehiculopersonaComponent;
  let fixture: ComponentFixture<VehiculopersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiculopersonaComponent]
    });
    fixture = TestBed.createComponent(VehiculopersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
