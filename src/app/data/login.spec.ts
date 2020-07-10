import { Login } from './login';

// @ts-ignore
describe('Test - Login Model', () => {
  let login: Login;
  beforeEach( () => {
      login = new Login('test@unit.fr', 'passwd');
  });

  it('Should create login nominal',  () => {
    expect(login.email).toBe('test@unit.fr');
    expect(login.password).toBe('passwd');
  });

  it('Should not login',  () => {
    expect(login.email).not.toBe('testunit.fr@');
    expect(login.password).toBe('passwd');
  });

});
