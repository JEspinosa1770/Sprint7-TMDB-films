
import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Register } from './register';
import { UserService } from '../../core/services/user-service';

describe('Register', () => {
  let component: Register;
  let userServiceMock: any;

  beforeEach(() => {
    userServiceMock = {
      register: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        Register,
        { provide: UserService, useValue: userServiceMock }
      ]
    });
    component = TestBed.inject(Register);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call authService.register when form is invalid', async () => {
    component.registerForm.patchValue({
      name: '',
      email: '',
      password: ''
    });

    await component.onSubmitRegister();

    expect(userServiceMock.register).not.toHaveBeenCalled();
    expect(component.buttonSubmitClicked()).toBe(true);
  });

  it('should call authService.register with correct data when form is valid', async () => {
    const name = 'John Doe';
    const email = 'test@test.com';
    const password = 'password123';

    userServiceMock.register.mockResolvedValue(undefined);

    component.registerForm.patchValue({ name, email, password });

    await component.onSubmitRegister();

    expect(userServiceMock.register).toHaveBeenCalledWith(email, password, name);
    expect(component.loading()).toBe(false);
  });

  it('should set errorMessage when register fails', async () => {
    const errorMsg = 'Email already exists';
    userServiceMock.register.mockRejectedValue(errorMsg);

    component.registerForm.patchValue({
      name: 'John Doe',
      email: 'test@test.com',
      password: 'password123'
    });

    await component.onSubmitRegister();

    expect(component.errorMessage()).toBe(errorMsg);
    expect(component.loading()).toBe(false);
  });
});
