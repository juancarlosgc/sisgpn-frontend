import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Subcircuito } from '../model/subcircuito';
import { Circuito } from '../model/circuito';

@Injectable({
  providedIn: 'root'
})
export class SubcircuitoService {

  public URL: string = 'http://localhost:8080/subcircuitos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private activatedRouter: ActivatedRoute) { }

  getSubcircuitos(page: number): Observable<any> {
    return this.http.get(this.URL + '/vertodo?page='+ page).pipe(
      map((response: any) => {
        (response.content as Subcircuito[]).map(subcircuito => {
          console.log(this.URL);
          return subcircuito;
        });
        return response;
      }),
    );
   }

   createSubcircuito(circuito: Subcircuito): Observable<Subcircuito> {
    console.log(circuito);
    return this.http.post<Subcircuito>(this.URL + '/crearsubcircuito', circuito, { headers: this.httpHeaders })
  }
 
  
  getSubcircuito(id: number): Observable <Subcircuito>{
    return this.http.get<Subcircuito>(this.URL + '/ver/' + id);
  };


  updateSubcircuito(circuito: Subcircuito): Observable<Subcircuito> {
    return this.http.put<Subcircuito>(`${this.URL}/editar`, circuito, { headers: this.httpHeaders })
  }

  deleteSubcircuito(id: number): Observable<Subcircuito> {
    return this.http.delete<Subcircuito>(`${this.URL}/eliminar/${id}`, { headers: this.httpHeaders })
  }

  public listCircuitos(): Observable<Circuito[]> {
    return this.http.get<Circuito[]>(this.URL + '/listarcircuitos');
  }

}
