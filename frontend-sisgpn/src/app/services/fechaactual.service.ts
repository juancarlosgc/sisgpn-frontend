import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FechaactualService {
  private apiUrl = 'http://localhost:8080/api/fecha'; // URL de tu endpoint en el backend

  constructor(private http: HttpClient) { }

  enviarFechaActual(): Observable<any> {
    const fechaActual = new Date().toISOString(); // Obtiene la fecha actual en formato ISO string
    return this.http.post<any>(this.apiUrl, { fecha: fechaActual });
  }


}
