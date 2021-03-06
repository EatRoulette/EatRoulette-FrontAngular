import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from '../../src/app/components/login/login.component';
import {browser, by, element, protractor} from 'protractor';

describe('LoginComponent', () => {
  // tslint:disable-next-line:prefer-const
  let component: LoginComponent;
  // tslint:disable-next-line:prefer-const
  let fixture: ComponentFixture<LoginComponent>;

  // tslint:disable-next-line:only-arrow-functions
  it('login test', function() {
    browser.get('http://localhost:4200/login');
    element(by.id('email')).sendKeys('testu@gmail.com');
    element(by.id('password')).sendKeys('testu');
    element(by.id('login')).click();

    const value = browser.executeScript('return window.localStorage.getItem(\'access_token\');');
    expect(value).not.toBe('');
    browser.driver.sleep(1000);
    // tslint:disable-next-line:prefer-const
    let expectedUrl = browser.driver.getCurrentUrl();
    expect(expectedUrl).toEqual('http://localhost:4200/');
  });

  // tslint:disable-next-line:only-arrow-functions
  it('User not logged', () => {
      browser.executeScript('window.localStorage.removeItem(\'access_token\');');
      browser.get('http://localhost:4200/tickets');
      browser.driver.sleep(1000);
      const expectedUrl = browser.driver.getCurrentUrl();
      expect(expectedUrl).toEqual('http://localhost:4200/login');
  });

});
