// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { FriendsComponent } from './friends.component';
// import {browser, by, element} from "protractor";
//
// describe('FriendsComponent', () => {
//   let component: FriendsComponent;
//   let fixture: ComponentFixture<FriendsComponent>;
//
//   beforeEach(() => {
//     console.log('COUCOU');
//
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should create new friendlist', function() {
//     browser.get('http://localhost:4200/friends');
//
//     element(by.id('test')).click();
//     element(by.id('name')).sendKeys('test friendlist');
//     element(by.id('add')).click();
//
//     const todoList = element.all(by.binding('groupSelection.name'));
//     expect(todoList.count()).toEqual(1);
//     expect(todoList.get(0).getText()).toEqual('test friendlist');
//
//   });
// });
