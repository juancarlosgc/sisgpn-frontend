import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Item } from '../model/item';
import { Mantenimiento } from '../model/mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  public URL: string = 'http://localhost:8080/items';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private activatedRouter: ActivatedRoute) { }
  
  getItems(page: number): Observable<any> {
    return this.http.get(this.URL + '/vertodo?page='+ page).pipe(
      map((response: any) => {
        (response.content as Item[]).map(item => {
          console.log(this.URL);
          return item;
        });
        return response;
      }),
    );
   }

  createItem(item: Item): Observable<Item> {
    //console.log(item);
    return this.http.post<Item>(this.URL + '/crear', item, { headers: this.httpHeaders })
  }
 
  
  getItem(id: number): Observable <Item>{
    return this.http.get<Item>(this.URL + '/ver/' + id);
  };


  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.URL}/editar`, item, { headers: this.httpHeaders })
  }

  deleteItem(id: number): Observable<Item> {
    return this.http.delete<Item>(`${this.URL}/eliminar/${id}`, { headers: this.httpHeaders })
  }

  public listMantenimientos(): Observable<Mantenimiento[]> {
    return this.http.get<Mantenimiento[]>(this.URL + '/listarmantenimientos');
  }

}
