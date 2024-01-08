import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paginatordistrito-nav',
  templateUrl: './paginatordistrito.component.html'
})
export class PaginatordistritoComponent implements OnInit{

  @Input() paginadorDistrito: any;
  paginas: number[];
  
  ngOnInit(): void {
    this.paginas = new Array(this.paginadorDistrito.totalPages).fill(0).map((_valor, indice) => indice + 1);
  }

}
