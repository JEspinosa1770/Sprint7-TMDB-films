import { Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = signal<User | null>(null);

  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.set(user);
    });
  }

  async register(email: string, password: string, name: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      this.currentUser.set(userCredential.user);
      await this.router.navigate(['/list']);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.currentUser.set(userCredential.user);
      await this.router.navigate(['/list']);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.currentUser.set(null);
      await this.router.navigate(['/']);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Este email ya está registrado';
      case 'auth/invalid-email':
        return 'Email inválido';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres';
      case 'auth/user-not-found':
        return 'Usuario no encontrado';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/invalid-credential':
        return 'Credenciales inválidas';
      default:
        return 'Error en la autenticación';
    }
  }
}

