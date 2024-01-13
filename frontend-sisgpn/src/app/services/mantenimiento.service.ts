import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Mantenimiento } from '../model/mantenimiento';


@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  public URL: string = 'http://localhost:8080/mantenimientos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getMantenimientos(page: number): Observable<any> {
    return this.http.get(this.URL + '/vertodo?page='+ page).pipe(
      map((response: any) => {
        (response.content as Mantenimiento[]).map(mantenimiento => {
          console.log(this.URL);
          return mantenimiento;
        });
        return response;
      }),
    );
   }

   createMantenimiento(distrito: Mantenimiento): Observable<Mantenimiento> {
    return this.http.post<Mantenimiento>(this.URL + '/crear', distrito, { headers: this.httpHeaders });
  }
 
  
  getMantenimiento(id: number): Observable <Mantenimiento>{
    return this.http.get<Mantenimiento>(this.URL + '/ver/' + id);
  }


  updateMantenimiento(mantenimiento: Mantenimiento): Observable<Mantenimiento> {
    return this.http.put<Mantenimiento>(`${this.URL}/editar`, mantenimiento, { headers: this.httpHeaders })
  }

  deleteMantenimiento(id: number): Observable<Mantenimiento> {
    return this.http.delete<Mantenimiento>(`${this.URL}/eliminar/${id}`, { headers: this.httpHeaders })
  }

}
