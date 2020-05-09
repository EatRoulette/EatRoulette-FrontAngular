import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantCarouselComponent } from './restaurant-carousel.component';

describe('RestaurantCarouselComponent', () => {
  let component: RestaurantCarouselComponent;
  let fixture: ComponentFixture<RestaurantCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
