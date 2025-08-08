// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/login/clientes'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

login(RazonSocial: string, RFC: string): Observable<HttpResponse<string>> {
  const credentials = { RazonSocial, RFC };
  console.log('Enviando credenciales:', credentials);
  return this.http.post(this.apiUrl, credentials, {
    observe: 'response',
    responseType: 'text'
  }).pipe(
    catchError(err => {
      // Pasar el error para que lo maneje el componente
      return throwError(() => err);
    })
  );
}


  // Nuevo método para guardar el token
  private saveToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  // Nuevo método para obtener el token
  public getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // Nuevo método para eliminar el token al cerrar sesión
  public logout(): void {
    localStorage.removeItem('jwt');
  }
}