import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paginatorcircuito-nav',
  templateUrl: './paginatorcircuito.component.html'
})
export class PaginatorcircuitoComponent implements OnInit{

  @Input() paginadorCircuito: any;
  paginas: number[];
  

  ngOnInit(): void {
    this.paginas = new Array(this.paginadorCircuito.totalPages).fill(0).map((_valor, indice) => indice + 1);
  }

}
