import { NotFoundComponent } from '../../src/app/components/not-found/not-found.component';
import {browser, by, element} from 'protractor';

describe('NotFoundComponent', () => {

  it('Bad url redirect to 404 not found', () => {
    browser.get('http://localhost:4200/NotAGoodURL');
    browser.driver.sleep(1000);
    const expectedUrl = browser.driver.getCurrentUrl();
    expect(expectedUrl).toEqual('http://localhost:4200/404');
  });

  it('Not found page redirect to home', () => {
    browser.get('http://localhost:4200/404');
    element(by.id('btnHome')).click();
    browser.driver.sleep(1000);
    const expectedUrl = browser.driver.getCurrentUrl();
    expect(expectedUrl).toEqual('http://localhost:4200/');
  });

});

