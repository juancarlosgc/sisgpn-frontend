import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  public URL: string = 'http://localhost:8080/personas';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  public persona: Persona = new Persona();

  
  constructor(private http: HttpClient, private router: Router, private activatedRouter: ActivatedRoute) { }

   getPersonas(page: number): Observable<any> {
    return this.http.get(this.URL + '/vertodo?page='+ page).pipe(
      map((response: any) => {
        (response.content as Persona[]).map(persona => {
        // persona.apellidos = persona.apellidos.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'es');
          console.log(this.URL);
          return persona;
        });
        return response;
      }),
    );

  }

  createPersona(persona: Persona): Observable<Persona> {
    console.log(persona)
    return this.http.post<Persona>(this.URL + '/crearpersona', persona, { headers: this.httpHeaders });
  }
 
  
  getPersona(id: number): Observable <Persona>{
    //return this.http.get<Persona>(this.URL + '/ver/' + id);
    return this.http.get<Persona>(this.URL + '/ver/' + id);
  };


  updatePersona(persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.URL}/editar`, persona, { headers: this.httpHeaders })
  }

  deletePersona(id: number): Observable<Persona> {
    return this.http.delete<Persona>(`${this.URL}/eliminar/${id}`, { headers: this.httpHeaders })
  }

  

}

