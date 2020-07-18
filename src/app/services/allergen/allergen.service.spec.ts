import { TestBed } from '@angular/core/testing';

import { AllergenService } from './allergen.service';

describe('Test - AllergenService', () => {
  let service: AllergenService;
  const mockedService = jasmine.createSpyObj(AllergenService, ['getAllergens']);
  const allergens = [{id: '1', name: 'test1', selected: false}, {id: '2', name: 'test2', selected: true}];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AllergenService, useValue: mockedService}
      ]
    });
    service = TestBed.inject(AllergenService);
  });

  it('Test - Get allergens mocked', async() => {
    mockedService.getAllergens.and.returnValue(allergens);
    const result = await mockedService.getAllergens();
    expect(mockedService.getAllergens).toHaveBeenCalled();
  });

  it('Test - Get allergens mocked right data', async() => {
    mockedService.getAllergens.and.returnValue(allergens);
    const result = await mockedService.getAllergens();
    expect(result[0].name).toBe('test1');
    expect(result[1].name).toBe('test2');
    expect(result[1].selected).toBe(true);
  });

  it('Test - Get allergens mocked data length', async () => {
    mockedService.getAllergens.and.returnValue(allergens);
    const result = await mockedService.getAllergens();
    expect(result.length).toBe(2);
  });

});
