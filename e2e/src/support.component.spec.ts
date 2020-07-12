import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportComponent } from '../../src/app/components/support/support.component';
import {browser, by, element} from "protractor";

describe('SupportComponent', () => {
  let component: SupportComponent;
  let fixture: ComponentFixture<SupportComponent>;

  beforeEach(() => {
    browser.get('http://localhost:4200/login');
    browser.executeScript("window.localStorage.setItem('access_token','edd515a0b007d98f3361949c242bdb02ecc4efa696e154d9c4787885e02363b6');");
    browser.get('http://localhost:4200/support');
  });

  it('should create new support', function() {
    element(by.id('object')).sendKeys('test support');
    element(by.id('description')).sendKeys('test description');
    element(by.id('type')).click();
    element(by.id('request')).click();
    element(by.id('btnSubmit')).click();
    browser.driver.sleep(1000);
    expect(element(by.id('success')).isPresent()).toBe(true);
  });

  it('should create new support faild', function() {
    element(by.id('btnSubmit')).click();
    browser.driver.sleep(1000);
    expect(element(by.id('errorObject')).isPresent()).toBe(true);
    expect(element(by.id('errorType')).isPresent()).toBe(true);
    expect(element(by.id('errorDescription')).isPresent()).toBe(true);
  });
});
