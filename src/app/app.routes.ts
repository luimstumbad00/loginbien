import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [
    // Redirige la raíz al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Ruta del login
  { path: 'login', component: LoginComponent },

  // Catch-all -> redirige a login (útil mientras pruebas)
  { path: '**', redirectTo: 'login' }
  
];
