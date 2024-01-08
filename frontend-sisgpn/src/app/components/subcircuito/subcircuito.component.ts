import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Circuito } from 'src/app/model/circuito';
import { Subcircuito } from 'src/app/model/subcircuito';
import { SubcircuitoService } from 'src/app/services/subcircuito.service';
import { UtilService } from 'src/app/services/util.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-subcircuito',
  templateUrl: './subcircuito.component.html',
  styleUrls: ['./subcircuito.component.css']
})
export class SubcircuitoComponent implements OnInit {
  
  isAdmin: any;
  subcircuitos: Subcircuito[] = [];
  circuitos: Circuito[] = [];
  paginadorSubircuito: any;

  constructor(private subCircuitoService: SubcircuitoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private util: UtilService) { }

  ngOnInit(): void {
    this.isAdmin = this.util.isAdmin();

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      console.log(page);
      if (!page) {
        page = 0;
      }

      this.subCircuitoService.getSubcircuitos(page)
        .pipe(
          tap(response => {
            (response.content as Subcircuito[]).forEach(subcircuito => console.log(subcircuito.nombreCircuito));

          })
        ).subscribe(response => {
          this.subcircuitos = response.content as Subcircuito[];
          this.paginadorSubircuito = response;
          
        });
    }
    );

  }

  deleteSubcircuito(subcircuito: Subcircuito): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar a ${subcircuito.codigoSubcircuito} ${subcircuito.nombreSubcircuito}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.subCircuitoService.deleteSubcircuito(subcircuito.idSubcircuito).subscribe(
          response => {
            this.subcircuitos = this.subcircuitos.filter(dis => dis !== subcircuito)
            swal(
              'Distrito Eliminado!',
              `Distrito ${subcircuito.nombreCircuito} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }


}
