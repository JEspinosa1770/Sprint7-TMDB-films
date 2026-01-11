import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  buttonSubmitClicked = signal(false);
  errorMessage = signal('');
  loading = signal(false);

  private fb = inject(FormBuilder);
  private authService = inject(UserService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  async onSubmitLogin() {
    this.buttonSubmitClicked.set(true);
    this.errorMessage.set('');

    if (this.loginForm.valid) {
      this.loading.set(true);
      try {
        const { email, password } = this.loginForm.value;
        await this.authService.login(email, password);
      } catch (error: any) {
        this.errorMessage.set(error);
      } finally {
        this.loading.set(false);
      }
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
