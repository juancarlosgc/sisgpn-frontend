import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Circuito } from '../model/circuito';
import { Subcircuito } from '../model/subcircuito';
import { Reclamos } from '../model/reclamos';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamoService {
  public URL: string = 'http://localhost:8080/reclamos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  public subcircuito: Subcircuito = new Subcircuito();
  public circuito: Circuito = new Circuito();
  public reclamo: Reclamos = new Reclamos();

 

  constructor(private http: HttpClient, private router: Router, private activatedRouter: ActivatedRoute) { }

  getReclamos(page: number): Observable<any> {
    return this.http.get(this.URL + '/vertodo?page='+ page).pipe(
      map((response: any) => {
        (response.content as Reclamos[]).map(reclamos => {
          let idSubcircuito= +reclamos.idSubcircuito;
          console.log(idSubcircuito);
          reclamos
          console.log(this.URL);
          return reclamos;
        });
        return response;
      }),
    );
   }

   createReclamo(reclamo: Reclamos): Observable<Reclamos> {
    return this.http.post<Reclamos>(this.URL + '/crear', reclamo, { headers: this.httpHeaders })
  }


  public listSubcircuitos(): Observable<Subcircuito[]> {
    return this.http.get<Subcircuito[]>(this.URL + '/listarsubcircuitos');
  }

  public listCircuitos(): Observable<Circuito[]> {
    return this.http.get<Circuito[]>(this.URL + '/listarcircuitos');
  }

  public obtenerListaPrincipal(): Observable<any[]> {
    return this.http.get<any[]>(this.URL + '/listarcircuitos');
  }

  public obtenerListaSecundaria(idPrincipal: number): Observable<any[]> {
    return this.http.get<any[]>(this.URL + '/listarsubcircuitos');
  }


  buscarPorRangoFechas(fechaInicio: Date, fechaFin: Date): Observable<any[]> {
    const params = { fechaInicio: fechaInicio.toISOString(), fechaFin: fechaFin.toISOString() };
    return this.http.get<any[]>(`${this.URL}/fechas`, { params });
  }

}
