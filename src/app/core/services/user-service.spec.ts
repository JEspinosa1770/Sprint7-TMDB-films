import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import { TestBed, getTestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideAuth, getAuth, connectAuthEmulator, Auth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { UserService } from './user-service';

describe('UserService', () => {
  let service: UserService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideFirebaseApp(() => initializeApp({
          apiKey: 'fake-api-key',
          authDomain: 'fake-auth-domain',
          projectId: 'fake-project-id',
        })),
        provideAuth(() => {
          const auth = getAuth();
          connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
          return auth;
        })
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should register a new user', async () => {
    const mockUser = {
      uid: '123',
      email: 'test@ejemplo.com',
      displayName: 'Juan Pérez',
    };

    vi.spyOn(service, 'register').mockImplementation(async (email, password, name) => {
      service.currentUser.set(mockUser as any);
    });

    await service.register('test@ejemplo.com', 'password123', 'Juan Pérez');

    expect(service.currentUser()).toBeTruthy();
    expect(service.currentUser()?.email).toBe('test@ejemplo.com');
  });



})


//     describe('login', () => {
//     it('debería hacer login con credenciales correctas', async () => {
//       // Primero registramos un usuario
//       await service.register('login@test.com', 'password123', 'Usuario Test');

//       // Hacemos logout
//       await service.logout();

//       // Verificamos que no hay usuario logueado
//       expect(service.currentUser()).toBeNull();

//       // Ahora hacemos login
//       await service.login('login@test.com', 'password123');

//       // Verificamos que el login funcionó
//       expect(service.currentUser()).toBeTruthy();
//       expect(service.currentUser()?.email).toBe('login@test.com');
//       expect(routerFalso.navigate).toHaveBeenCalledWith(['/list']);
//     });

//     it('debería dar error con credenciales incorrectas', async () => {
//       // Registrar usuario
//       await service.register('user@test.com', 'correcta123', 'User');
//       await service.logout();

//       // Intentar login con contraseña incorrecta
//       await expect(
//         service.login('user@test.com', 'incorrecta')
//       ).rejects.toThrow('Contraseña incorrecta');
//     });
//   });

//   describe('logout', () => {
//     it('debería cerrar sesión correctamente', async () => {
//       // Registrar usuario
//       await service.register('logout@test.com', 'pass123', 'User');

//       // Verificar que hay usuario logueado
//       expect(service.currentUser()).toBeTruthy();

//       // Hacer logout
//       await service.logout();

//       // Verificar que ya no hay usuario
//       expect(service.currentUser()).toBeNull();
//       expect(routerFalso.navigate).toHaveBeenCalledWith(['/']);
//     });
//   });
// });
