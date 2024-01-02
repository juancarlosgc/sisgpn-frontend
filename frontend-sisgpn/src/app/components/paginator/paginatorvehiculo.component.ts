import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paginatorvehiculo-nav',
  templateUrl: './paginatorvehiculo.component.html'
})
export class PaginatorvehiculoComponent implements OnInit{

  @Input() paginadorVehiculo: any;
  paginas: number[];
  
  ngOnInit(): void {
    this.paginas = new Array(this.paginadorVehiculo.totalPages).fill(0).map((_valor, indice) => indice + 1);
  }

}
