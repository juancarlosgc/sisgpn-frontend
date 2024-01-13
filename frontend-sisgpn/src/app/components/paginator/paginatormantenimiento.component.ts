import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paginatormantenimiento-nav',
  templateUrl: './paginatormantenimiento.component.html'
})
export class PaginatormantenimientoComponent implements OnInit{

  @Input() paginadorMantenimiento: any;
  paginas: number[];
  
  ngOnInit(): void {
    this.paginas = new Array(this.paginadorMantenimiento.totalPages).fill(0).map((_valor, indice) => indice + 1);
  }
}
