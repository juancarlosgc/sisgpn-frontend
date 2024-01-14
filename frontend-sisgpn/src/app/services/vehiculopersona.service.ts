import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../model/persona';
import { Vehiculo } from '../model/vehiculo';
import { Vehiculopersona } from '../model/vehiculopersona';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculopersonaService {

  public URL: string = 'http://localhost:8080/vehiculospersonas';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  public persona: Persona = new Persona();
  public vehiculo: Vehiculo = new Vehiculo();
  public vehiculoPersona: Vehiculopersona = new Vehiculopersona();

  constructor(private http: HttpClient, private router: Router, private activatedRouter: ActivatedRoute) { }

  getVehiculosPersonas(page: number): Observable<any> {
    return this.http.get(this.URL + '/vertodo?page='+ page).pipe(
      map((response: any) => {
        (response.content as Vehiculopersona[]).map(vehiculopersona => {
          console.log(this.URL);
          return vehiculopersona;
        });
        return response;
      }),
    );
   }


  createVehiculoPersona(circuito: Vehiculopersona): Observable<Vehiculopersona> {
    console.log(circuito);
    return this.http.post<Vehiculopersona>(this.URL + '/crear', circuito, { headers: this.httpHeaders })
  }
 
  
  getVehiculoPersona(id: number): Observable <Vehiculopersona>{
    return this.http.get<Vehiculopersona>(this.URL + '/ver/' + id);
  };


  updateVehiculoPersona(circuito: Vehiculopersona): Observable<Vehiculopersona> {
    return this.http.put<Vehiculopersona>(`${this.URL}/editar`, circuito, { headers: this.httpHeaders })
  }

  deleteVehiculoPersona(id: number): Observable<Vehiculopersona> {
    return this.http.delete<Vehiculopersona>(`${this.URL}/eliminar/${id}`, { headers: this.httpHeaders })
  }

  public listVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.URL + '/listarvehiculos');
  }

  public listPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.URL + '/listarpersonas');
  }

}
