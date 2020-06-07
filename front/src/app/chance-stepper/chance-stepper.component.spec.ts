import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanceStepperComponent } from './chance-stepper.component';

describe('ChanceStepperComponent', () => {
  let component: ChanceStepperComponent;
  let fixture: ComponentFixture<ChanceStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChanceStepperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChanceStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
