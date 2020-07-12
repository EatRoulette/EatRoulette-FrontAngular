import { RegisterComponent } from '../../src/app/components/register/register.component';
import {browser, by, element, Key} from 'protractor';

describe('RegisterComponent', () => {

  beforeEach(() => {
    browser.get('http://localhost:4200/register');
    element(by.id('lname')).sendKeys('UNIT');
    element(by.id('fname')).sendKeys('Test');
    element(by.id('email')).sendKeys('test@unit.fr');
    element(by.id('pwd')).sendKeys('password');
    element(by.id('address')).sendKeys('3 street Unit Test');
    element(by.id('town')).sendKeys('PARIS');
    element(by.id('cp')).sendKeys('75012');
    element(by.id('phone')).sendKeys('0123456789');
    element(by.id('cgu')).click();
  });

  it('Register - All fields are empty', () => {
    element(by.id('lname')).sendKeys(Key.SHIFT, Key.ARROW_UP, Key.BACK_SPACE);
    element(by.id('fname')).sendKeys(Key.SHIFT, Key.ARROW_UP, Key.BACK_SPACE);
    element(by.id('email')).sendKeys(Key.SHIFT, Key.ARROW_UP, Key.BACK_SPACE);
    element(by.id('pwd')).sendKeys(Key.SHIFT, Key.ARROW_UP, Key.BACK_SPACE);
    element(by.id('address')).sendKeys(Key.SHIFT, Key.ARROW_UP, Key.BACK_SPACE);
    element(by.id('town')).sendKeys(Key.SHIFT, Key.ARROW_UP, Key.BACK_SPACE);
    element(by.id('cp')).sendKeys(Key.SHIFT, Key.ARROW_UP, Key.BACK_SPACE);
    element(by.id('phone')).sendKeys(Key.SHIFT, Key.ARROW_UP, Key.BACK_SPACE);
    element(by.id('cgu')).click();
    element(by.id('btnSubmit')).click();
    browser.driver.sleep(1000);

    expect(element(by.id('nameError')).isPresent()).toBe(true);
    expect(element(by.id('emailError')).isPresent()).toBe(true);
    expect(element(by.id('pwdError')).isPresent()).toBe(true);
    expect(element(by.id('addressError')).isPresent()).toBe(true);
    expect(element(by.id('townError')).isPresent()).toBe(true);
    expect(element(by.id('cpError')).isPresent()).toBe(true);
    expect(element(by.id('phoneError')).isPresent()).toBe(true);
    expect(element(by.id('cguError')).isPresent()).toBe(true);
  });

  it('Register - Invalid email format', () => {
    element(by.id('email')).clear();
    element(by.id('email')).sendKeys('badEmail.fr@');
    element(by.id('btnSubmit')).click();
    browser.driver.sleep(1000);
    expect(element(by.id('emailError')).isPresent()).toBe(true);
  });

  it('Register - Invalid postal code', () => {
    element(by.id('cp')).clear();
    element(by.id('cp')).sendKeys('Toto');
    element(by.id('btnSubmit')).click();
    browser.driver.sleep(1000);
    expect(element(by.id('cpError')).isPresent()).toBe(true);
    element(by.id('cp')).clear();
    element(by.id('cp')).sendKeys('74852186');
    element(by.id('btnSubmit')).click();
    expect(element(by.id('cpError')).isPresent()).toBe(true);
  });

  it('Register - Invalid phone number ', () => {
    element(by.id('phone')).clear();
    element(by.id('phone')).sendKeys('PhoneNumber');
    element(by.id('btnSubmit')).click();
    browser.driver.sleep(1000);
    expect(element(by.id('phoneError')).isPresent()).toBe(true);
    element(by.id('phone')).clear();
    element(by.id('phone')).sendKeys('74852186');
    element(by.id('btnSubmit')).click();
    expect(element(by.id('phoneError')).isPresent()).toBe(true);
  });

  it('Register - CGU not checked', () => {
    element(by.id('cgu')).click();
    element(by.id('btnSubmit')).click();
    browser.driver.sleep(1000);
    expect(element(by.id('cguError')).isPresent()).toBe(true);
  });

});
