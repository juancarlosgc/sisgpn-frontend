import { Injectable } from '@angular/core';
import { Vehiculo } from '../model/vehiculo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  public URL: string = 'http://localhost:8080/vehiculos';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  public vehiculo: Vehiculo = new Vehiculo();

  constructor(private http: HttpClient, private router: Router, private activatedRouter: ActivatedRoute) { }

  getVehiculos(page: number): Observable<any> {
    return this.http.get(this.URL + '/vertodo?page='+ page).pipe(
      map((response: any) => {
        (response.content as Vehiculo[]).map(vehiculo => {
        // persona.apellidos = persona.apellidos.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'es');
          console.log(this.URL);
          return vehiculo;
        });
        return response;

      }),
    );

  }

  createVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    console.log(vehiculo)
    return this.http.post<Vehiculo>(this.URL + '/crearvehiculo', vehiculo, { headers: this.httpHeaders });
  }
 
  
  getVehiculo(id: number): Observable <Vehiculo>{
    return this.http.get<Vehiculo>(this.URL + '/ver/' + id);
  };


  updateVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(`${this.URL}/editar`, vehiculo, { headers: this.httpHeaders })
  }

  deleteVehiculo(id: number): Observable<Vehiculo> {
    return this.http.delete<Vehiculo>(`${this.URL}/eliminar/${id}`, { headers: this.httpHeaders })
  }
}
