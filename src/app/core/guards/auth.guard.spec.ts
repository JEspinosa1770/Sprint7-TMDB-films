import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { UserService } from '../services/user-service';
import { User } from '@angular/fire/auth';

describe('authGuard', () => {
  let userServiceMocked: any;
  let routerMocked: any;

  beforeEach(() => {
    // Creamos servicios falsos
    userServiceMocked = {
      currentUser: vi.fn()
    };

    routerMocked = {
      navigate: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: userServiceMocked },
        { provide: Router, useValue: routerMocked }
      ]
    });
  });

  it('should allow access if the user is logged in', () => {
    const usuarioMock = { uid: '123' } as User;
    userServiceMocked.currentUser.mockReturnValue(usuarioMock);

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, {} as any)
    );

    expect(result).toBe(true);
    expect(routerMocked.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to login if there is no user', () => {
    userServiceMocked.currentUser.mockReturnValue(null);

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, {} as any)
    );

    expect(result).toBe(false);
    expect(routerMocked.navigate).toHaveBeenCalledWith(['/login']);
  });
});
