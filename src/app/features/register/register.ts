import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  buttonSubmitClicked = signal(false);
  errorMessage = signal('');
  loading = signal(false);

  private fb = inject(FormBuilder);
  private authService = inject(UserService);

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  async onSubmitRegister() {
    this.buttonSubmitClicked.set(true);
    this.errorMessage.set('');

    if (this.registerForm.valid) {
      this.loading.set(true);
      try {
        const { name, email, password } = this.registerForm.value;
        await this.authService.register(email, password, name);
      } catch (error: any) {
        this.errorMessage.set(error);
      } finally {
        this.loading.set(false);
      }
    }
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
