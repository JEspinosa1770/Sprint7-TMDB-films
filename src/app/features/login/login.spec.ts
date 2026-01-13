
import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Login } from './login';
import { UserService } from '../../core/services/user-service';

describe('Login', () => {
  let component: Login;
  let userServiceMock: any;

  beforeEach(() => {
    userServiceMock = {
      login: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        Login,
        { provide: UserService, useValue: userServiceMock }
      ]
    });
    component = TestBed.inject(Login);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call authService.login when form is invalid', async () => {
    component.loginForm.patchValue({
      email: '',
      password: ''
    });

    await component.onSubmitLogin();

    expect(userServiceMock.login).not.toHaveBeenCalled();
    expect(component.buttonSubmitClicked()).toBe(true);
  });

  it('should call authService.login with correct credentials when form is valid', async () => {
    const email = 'test@test.com';
    const password = 'password123';

    userServiceMock.login.mockResolvedValue(undefined);

    component.loginForm.patchValue({ email, password });

    await component.onSubmitLogin();

    expect(userServiceMock.login).toHaveBeenCalledWith(email, password);
    expect(component.loading()).toBe(false);
  });

  it('should set errorMessage when login fails', async () => {
    const errorMsg = 'Invalid credentials';
    userServiceMock.login.mockRejectedValue(errorMsg);

    component.loginForm.patchValue({
      email: 'test@test.com',
      password: 'wrongpassword'
    });

    await component.onSubmitLogin();

    expect(component.errorMessage()).toBe(errorMsg);
    expect(component.loading()).toBe(false);
  });
});
