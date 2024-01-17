import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehiculo } from '../model/vehiculo';
import { Subcircuito } from '../model/subcircuito';
import { Distritovehiculo } from '../model/distritovehiculo';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistritovehiculoService {
  public URL: string = 'http://localhost:8080/distritosvehiculos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  public subcircuito: Subcircuito = new Subcircuito();
  public vehiculo: Vehiculo = new Vehiculo();
  public distritoVehiculo: Distritovehiculo = new Distritovehiculo();

  constructor(private http: HttpClient, private router: Router, private activatedRouter: ActivatedRoute) { }


  getDistritosVehiculos(page: number): Observable<any> {
    return this.http.get(this.URL + '/vertodo?page='+ page).pipe(
      map((response: any) => {
        (response.content as Distritovehiculo[]).map(distritovehiculo => {
          console.log(this.URL);
          return distritovehiculo;
        });
        return response;
      }),
    );
   }

   
   createDistritoVehiculo(circuito: Distritovehiculo): Observable<Distritovehiculo> {
    console.log(circuito);
    return this.http.post<Distritovehiculo>(this.URL + '/crear', circuito, { headers: this.httpHeaders })
  }
 
  
  getDistritoVehiculo(id: number): Observable <Distritovehiculo>{

    return this.http.get<Distritovehiculo>(this.URL + '/ver/' + id);
  };

  
  updateDistritoVehiculo(circuito: Distritovehiculo): Observable<Distritovehiculo> {
    return this.http.put<Distritovehiculo>(`${this.URL}/editar`, circuito, { headers: this.httpHeaders })
  }

  deleteDistritoVehiculo(id: number): Observable<Distritovehiculo> {
    return this.http.delete<Distritovehiculo>(`${this.URL}/eliminar/${id}`, { headers: this.httpHeaders })
  }

  public listVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.URL + '/listarvehiculos');
  }

  public listSubcircuitos(): Observable<Subcircuito[]> {
    return this.http.get<Subcircuito[]>(this.URL + '/listarsubcircuitos');
  }

   
}
