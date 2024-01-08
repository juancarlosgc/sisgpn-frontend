import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paginatorsubcircuito-nav',
  templateUrl: './paginatorsubcircuito.component.html'
})
export class PaginatorsubcircuitoComponent implements OnInit {

  @Input() paginadorSubcircuito: any;
  paginas: number[];

  ngOnInit(): void {
    this.paginas = new Array(this.paginadorSubcircuito.totalPages).fill(0).map((_valor, indice) => indice + 1);
  }

}
