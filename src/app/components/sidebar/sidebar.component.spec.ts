import { SidebarComponent } from './sidebar.component';
import {browser, by, element} from 'protractor';

describe('SidebarComponent', () => {

  beforeEach(() => {
    browser.get('http://localhost:4200/login');
    browser.executeScript('window.localStorage.setItem(\'access_token\',\'edd515a0b007d98f3361949c242bdb02ecc4efa696e154d9c4787885e02363b6\');');
    browser.get('http://localhost:4200/');
  });

  it('Logout test', () => {
    element(by.id('logout')).click();
    browser.driver.sleep(1000);
    const expectedUrl = browser.driver.getCurrentUrl();
    expect(expectedUrl).toEqual('http://localhost:4200/login');
    const value = browser.executeScript('return window.localStorage.getItem(\'access_token\');');
    expect(value).toBeNull();
  });

});
