import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  form = new FormGroup({
    razonSocial: new FormControl('', Validators.required),
    rfc: new FormControl('', Validators.required)
  });

  serverError: string | null = null;
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.serverError = null;

    const { razonSocial, rfc } = this.form.value;

    this.auth.login(razonSocial!, rfc!).subscribe({
      next: (res) => {
        this.loading = false;

        const body = res.body ?? {};
        const token =
          body?.token ??
          body?.jwt ??
          body?.accessToken ??
          body?.access_token ??
          (res.headers?.get ? res.headers.get('Authorization')?.replace('Bearer ', '') : null);

        if (token) {
          localStorage.setItem('jwt', token);
          this.router.navigate(['/dashboard']);
        } else {
          this.serverError = 'Autenticación exitosa pero no se recibió token.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.serverError =
          err?.error?.message ??
          (typeof err?.error === 'string' ? err.error : null) ??
          err?.statusText ??
          'Error desconocido del servidor.';
      }
    });
  }
}
