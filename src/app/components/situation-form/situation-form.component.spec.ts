import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationFormComponent } from './situation-form.component';

describe('SituationFormComponent', () => {
  let component: SituationFormComponent;
  let fixture: ComponentFixture<SituationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
