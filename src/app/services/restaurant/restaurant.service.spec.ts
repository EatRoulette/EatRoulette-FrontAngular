import { TestBed } from '@angular/core/testing';

import { RestaurantService } from './restaurant.service';
import {Restaurant} from '../../data/restaurant';

describe('Test - RestaurantsService', () => {
  let restaurantService: RestaurantService;
  // @ts-ignore
  const mockedService = jasmine.createSpyObj(RestaurantService, ['addRestaurant']);
  const restaurant = new Restaurant('1', 'Test', 'unit',
                              'Test', 'UNIT', '123456',
                              [], [], 'www.test.unit');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RestaurantService, useValue: mockedService}
      ]
    });
    restaurantService = TestBed.inject(RestaurantService);
  });

  it('Test - Mocked add restaurant', async() => {
    mockedService.addRestaurant.and.returnValue(restaurant);
    const result = await restaurantService.addRestaurant(restaurant);
    expect(result).toBe(result);
    expect(mockedService.addRestaurant).toHaveBeenCalled();
  });

});
