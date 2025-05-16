import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  authForm: FormGroup;
  isLoginMode = true;
  message = '';

  constructor(private fb: FormBuilder, private common: CommonService, private router: Router) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.message = '';
    this.authForm.reset();
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const { email, password } = this.authForm.value;

    const url = this.isLoginMode ? 'auth/login' : 'auth/signup';
    const body = this.isLoginMode ? { email, password } : { email, password, name: 'User' };
    this.common.sendRequest(url, 'POST', body).subscribe({
      next: (response: any) => {
        if (response) {
          localStorage.setItem('token', response.token);
          this.message = this.isLoginMode ? 'Login successful!' : 'Signup successful!';
          this.router.navigate(['/home']);
        } else {
          this.message = response.message || 'An error occurred. Please try again.';
        }
      },
      error: (err) => {
        console.error('An error occurred:', err);
        this.message = 'An error occurred. Please try again.';
      },
      complete: () => console.log('Request completed')
    });
  }

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }
}
