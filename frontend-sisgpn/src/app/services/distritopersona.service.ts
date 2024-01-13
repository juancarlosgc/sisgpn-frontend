import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subcircuito } from '../model/subcircuito';
import { Persona } from '../model/persona';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Distritopersona } from '../model/distritopersona';

@Injectable({
  providedIn: 'root'
})
export class DistritopersonaService {
  public URL: string = 'http://localhost:8080/distritospersonas';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  public subcircuito: Subcircuito = new Subcircuito();
  public persona: Persona = new Persona();
  public distritopersona: Distritopersona = new Distritopersona();

  constructor(private http: HttpClient, private router: Router, private activatedRouter: ActivatedRoute) { }

  getDistritosPersonas(page: number): Observable<any> {
    return this.http.get(this.URL + '/vertodo?page='+ page).pipe(
      map((response: any) => {
        (response.content as Distritopersona[]).map(distritopersona => {
          console.log(this.URL);
          return distritopersona;
        });
        return response;
      }),
    );
   }

   createDistritoPersona(circuito: Distritopersona): Observable<Distritopersona> {
    console.log(circuito);
    return this.http.post<Distritopersona>(this.URL + '/crear', circuito, { headers: this.httpHeaders })
  }
 
  
  getDistritoPersona(id: number): Observable <Distritopersona>{

    return this.http.get<Distritopersona>(this.URL + '/ver/' + id);
  };


  updateDistritoPersona(circuito: Distritopersona): Observable<Distritopersona> {
    return this.http.put<Distritopersona>(`${this.URL}/editar`, circuito, { headers: this.httpHeaders })
  }

  deleteDistritoPersona(id: number): Observable<Distritopersona> {
    return this.http.delete<Distritopersona>(`${this.URL}/eliminar/${id}`, { headers: this.httpHeaders })
  }

  public listPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.URL + '/listarpersonas');
  }

  public listSubcircuitos(): Observable<Subcircuito[]> {
    return this.http.get<Subcircuito[]>(this.URL + '/listarsubcircuitos');
  }


}
