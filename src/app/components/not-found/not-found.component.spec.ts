import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import {browser} from "protractor";

describe('NotFoundComponent', () => {

  it('Bad url redirect to 404 not found', () => {
    browser.get('http://localhost:4200/NotAGoodURL');
    browser.driver.sleep(3000);
    const expectedUrl = browser.driver.getCurrentUrl();
    expect(expectedUrl).toEqual('http://localhost:4200/404');
  });

});
