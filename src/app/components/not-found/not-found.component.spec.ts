import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import {browser} from "protractor";

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ NotFoundComponent ]
  //   })
  //   .compileComponents();
  // }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Bad url redirect to 404 not found', () => {
    browser.get('http://localhost:4200/NotAGoodURL');
    browser.driver.sleep(3000);
    const expectedUrl = browser.driver.getCurrentUrl();
    expect(expectedUrl).toEqual('http://localhost:4200/404');
  });



});
