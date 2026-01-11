import { Component, signal } from '@angular/core';
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
  registerForm: FormGroup;
  buttonSubmitClicked = signal(false);
  errorMessage = signal('');
  loading = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: UserService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z0-9]+$/)]]
    });
  }

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
