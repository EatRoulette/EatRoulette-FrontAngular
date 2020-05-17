import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaLoaderComponent } from './pizza-loader.component';

describe('PizzaLoaderComponent', () => {
  let component: PizzaLoaderComponent;
  let fixture: ComponentFixture<PizzaLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
