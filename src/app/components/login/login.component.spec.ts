import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {browser, by, element, protractor} from "protractor";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ LoginComponent ]
  //   })
  //   .compileComponents();
  // }));
  //
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LoginComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login test', function() {
    browser.get('http://localhost:4200/login');
    element(by.id('email')).sendKeys('testu@gmail.com');
    element(by.id('password')).sendKeys('testu');
    element(by.id('login')).click();

    const value = browser.executeScript("return window.localStorage.getItem('access_token');");
    expect(value).not.toBe('');
    browser.driver.sleep(3000);
    var expectedUrl = browser.driver.getCurrentUrl();
    expect(expectedUrl).toEqual('http://localhost:4200/');
  });

  it('user not login', function() {
      browser.get('http://localhost:4200/  ');
  })
});
