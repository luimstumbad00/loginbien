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
  template: `
    <h2>Login</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div>
        <label>Razón social</label><br />
        <input formControlName="razonSocial" />
        <div *ngIf="form.controls['razonSocial'].touched && form.controls['razonSocial'].invalid">
          Razón social requerida.
        </div>
      </div>

      <div>
        <label>RFC</label><br />
        <input formControlName="rfc" />
        <div *ngIf="form.controls['rfc'].touched && form.controls['rfc'].invalid">
          RFC requerido.
        </div>
      </div>

      <div *ngIf="serverError" style="color:darkred; margin-top:8px;">
        {{ serverError }}
      </div>

      <button type="submit" [disabled]="loading">Entrar</button>
    </form>
  `
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

        // Intentamos encontrar el token en varios lugares comunes:
        const body = res.body ?? {};
        const token =
          body?.token ??
          body?.jwt ??
          body?.accessToken ??
          body?.access_token ??
          // Si el backend devuelve Authorization en header:
          (res.headers?.get ? res.headers.get('Authorization')?.replace('Bearer ', '') : null);

        if (token) {
          localStorage.setItem('jwt', token);
          // Navega a la ruta que quieras después del login:
          this.router.navigate(['/dashboard']); // o la ruta que prefieras
        } else {
          // Si 200 pero no viene token:
          this.serverError = 'Autenticación exitosa pero no se recibió token.';
        }
      },
      error: (err) => {
        this.loading = false;
        // Mostrar el error personalizado que envía el servidor cuando exista
        // (puede estar en err.error.message, err.error, etc.)
        this.serverError =
          err?.error?.message ??
          (typeof err?.error === 'string' ? err.error : null) ??
          err?.statusText ??
          'Error desconocido del servidor.';
      }
    });
  }
}
