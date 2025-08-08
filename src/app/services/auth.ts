// src/app/services/auth.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = 'http://localhost:8080/login/clientes';

  constructor(private http: HttpClient) {}

  login(razonSocial: string, rfc: string): Observable<HttpResponse<any>> {
    const payload = {
      RazonSocial: razonSocial,
      RFC: rfc
    };
    return this.http.post<any>(this.url, payload, { observe: 'response' });
  }
}
