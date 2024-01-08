import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Circuito } from '../model/circuito';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Distrito } from '../model/distrito';

@Injectable({
  providedIn: 'root'
})
export class CircuitoService {

  public URL: string = 'http://localhost:8080/circuitos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  public circuito: Circuito = new Circuito();
  public distrito: Distrito = new Distrito();

  constructor(private http: HttpClient, private router: Router, private activatedRouter: ActivatedRoute) { }


  getCircuitos(page: number): Observable<any> {
    return this.http.get(this.URL + '/vertodo?page='+ page).pipe(
      map((response: any) => {
        (response.content as Circuito[]).map(circuito => {
          console.log(this.URL);
          return circuito;
        });
        return response;
      }),
    );
   }

   createCircuito(circuito: Circuito): Observable<Circuito> {
    console.log(circuito);
    return this.http.post<Circuito>(this.URL + '/crearcircuito', circuito, { headers: this.httpHeaders })
  }
 
  
  getCircuito(id: number): Observable <Circuito>{

    return this.http.get<Circuito>(this.URL + '/ver/' + id);
  };


  updateCircuito(circuito: Circuito): Observable<Circuito> {
    return this.http.put<Circuito>(`${this.URL}/editar`, circuito, { headers: this.httpHeaders })
  }

  deleteCircuito(id: number): Observable<Circuito> {
    return this.http.delete<Circuito>(`${this.URL}/eliminar/${id}`, { headers: this.httpHeaders })
  }

  public listDistritos(): Observable<Distrito[]> {
    return this.http.get<Distrito[]>(this.URL + '/listardistritos');
  }

}
