import { TestBed } from '@angular/core/testing';

import { CharacteristicService } from './characteristic.service';

describe('Test - CharacteristicService', () => {
  let service: CharacteristicService;
  const mockedService = jasmine.createSpyObj(CharacteristicService, ['getCharacteristics']);
  const characteristics = [{id: '1', name: 'Vegan', selected: false},
                           {id: '2', name: 'PMR', selected: true},
                           {id: '3', name: '---', selected: false}];


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CharacteristicService, useValue: mockedService }
      ]
    });
    service = TestBed.inject(CharacteristicService);
  });

  it('Test - Get characteristic mocked', async () => {
    mockedService.getCharacteristics.and.returnValue(characteristics);
    await mockedService.getCharacteristics();
    expect(mockedService.getCharacteristics).toHaveBeenCalled();
  });

  it('Test - Get characteristic mocked right data', async () => {
    mockedService.getCharacteristics.and.returnValue(characteristics);
    const result = await mockedService.getCharacteristics();
    expect(result[0].name).toBe('Vegan');
    expect(result[1].name).toBe('PMR');
    expect(result[1].selected).toBe(true);
  });

  it('Test - Get characteristic mocked data length', async () => {
    mockedService.getCharacteristics.and.returnValue(characteristics);
    const result = await mockedService.getCharacteristics();
    expect(result.length).toBe(3);
  });
});
