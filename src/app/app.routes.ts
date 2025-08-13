import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { Logadm } from './components/logadm/logadm';

export const routes: Routes = [
  { path: 'logadm', component: Logadm },

    // Redirige la raíz al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Ruta del login
  { path: 'login', component: LoginComponent },

  // Catch-all -> redirige a login (útil mientras pruebas)
  { path: '**', redirectTo: 'login' },

  { path: 'logadm', component: Logadm },
  
];
