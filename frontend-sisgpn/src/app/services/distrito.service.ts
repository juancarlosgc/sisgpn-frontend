import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Distrito } from '../model/distrito';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {
  public URL: string = 'http://localhost:8080/distritos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  //public distrito: Distrito = new Distrito();

  constructor(private http: HttpClient, private router: Router, private activatedRouter: ActivatedRoute) { }

  getDistritos(page: number): Observable<any> {
    return this.http.get(this.URL + '/vertodo?page='+ page).pipe(
      map((response: any) => {
        (response.content as Distrito[]).map(distrito => {
          console.log(this.URL);
          return distrito;
        });
        return response;
      }),
    );
   }

   createDistrito(distrito: Distrito): Observable<Distrito> {
    console.log(distrito)
    return this.http.post<Distrito>(this.URL + '/creardistrito', distrito, { headers: this.httpHeaders });
  }
 
  
  getDistrito(id: number): Observable <Distrito>{
    return this.http.get<Distrito>(this.URL + '/ver/' + id);
  }


  updateDistrito(distrito: Distrito): Observable<Distrito> {
    return this.http.put<Distrito>(`${this.URL}/editar`, distrito, { headers: this.httpHeaders })
  }

  deleteDistrito(id: number): Observable<Distrito> {
    return this.http.delete<Distrito>(`${this.URL}/eliminar/${id}`, { headers: this.httpHeaders })
  }

  }

  


