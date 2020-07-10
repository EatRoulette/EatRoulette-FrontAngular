import { TestBed } from '@angular/core/testing';

import { FriendsService } from './friends.service';

describe('Test - FriendsService', () => {
  let service: FriendsService;
  const mockedService = jasmine.createSpyObj(FriendsService,
    ['search', 'addGroup', 'deleteGroup', 'addNewFriend', 'deleteFriend', 'getGroups']);
  const friends = [{id: '1', lastName: 'UNIT', firstName: 'Test'},
                   {id: '2', lastName: 'DUPONT', firstName: 'Jean'},
                   {id: '3', lastName: 'HOWARD', firstName: 'Matt'}];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FriendsService, useValue: mockedService }
      ]
    });
    service = TestBed.inject(FriendsService);
  });

  it('Test - Mocked search', async () => {
    const searchValues =  {firstName: 'Test', lastName: 'UNIT'};
    mockedService.search.and.returnValue(friends);
    await mockedService.search(searchValues);
    expect(mockedService.search).toHaveBeenCalled();
  });

  it('Test - Mocked search friends', async () => {
    const searchValues =  {firstName: 'Test', lastName: 'UNIT'};
    mockedService.search.and.returnValue(friends);
    const result = await mockedService.search(searchValues);
    expect(result[0].lastName).toBe('UNIT');
  });

  it('Test - Mocked addGroup', async () => {
    const searchValues =  {name: 'Group Test'};
    const returnValue = {id: 1, name: 'Group Test', friends};
    mockedService.addGroup.and.returnValue(returnValue);
    const result = await mockedService.addGroup(searchValues);
    expect(mockedService.addGroup).toHaveBeenCalled()
    expect(result.id).toBe(1);
    expect(result.name).toBe('Group Test');
  });

  it('Test - Mocked getGroups', async () => {
    const returnValue = [{id: 1, name: 'Group Test', friends}, {id: 2, name: 'BestFriends', friends}];
    mockedService.getGroups.and.returnValue(returnValue);
    const result = await mockedService.getGroups();
    expect(mockedService.getGroups).toHaveBeenCalled()
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Group Test');
    expect(result[1].id).toBe(2);
  });

  it('Test - Mocked deleteGroup', async () => {
    const returnValue = [{id: 1, name: 'Group Test', friends}];
    mockedService.deleteGroup.and.returnValue(returnValue);
    const result = await mockedService.deleteGroup(2);
    expect(mockedService.deleteGroup).toHaveBeenCalled()
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Group Test');
    expect(result[0].id).toBe(1);
  });
});
