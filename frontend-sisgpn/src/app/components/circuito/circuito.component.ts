import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Circuito } from 'src/app/model/circuito';
import { Distrito } from 'src/app/model/distrito';
import { CircuitoService } from 'src/app/services/circuito.service';
import { UtilService } from 'src/app/services/util.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-circuito',
  templateUrl: './circuito.component.html',
  styleUrls: ['./circuito.component.css']
})
export class CircuitoComponent implements OnInit{

  isAdmin: any;
  circuitos: Circuito[] = [];
  distritos: Distrito[] = [];
  paginadorCircuito: any;

  constructor(private circuitoServicio: CircuitoService, private activatedRoute: ActivatedRoute, private util: UtilService) { }

  ngOnInit(): void {
    this.isAdmin = this.util.isAdmin();

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      console.log(page);
      if (!page) {
        page = 0;
      }

      this.circuitoServicio.getCircuitos(page)
        .pipe(
          tap(response => {
            (response.content as Circuito[]).forEach(circuito => console.log(circuito.nombreCircuito));

          })
        ).subscribe(response => {
          this.circuitos = response.content as Circuito[];
          this.paginadorCircuito = response;
          
        });
    }
    );
  }

  deleteCircuito(circuito: Circuito): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar a ${circuito.codigoCircuito} ${circuito.nombreCircuito}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.circuitoServicio.deleteCircuito(circuito.idCircuito).subscribe(
          response => {
            this.circuitos = this.circuitos.filter(dis => dis !== circuito)
            swal(
              'Distrito Eliminado!',
              `Distrito ${circuito.nombreCircuito} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

  cargarDistritos(): void {
    this.circuitoServicio.listDistritos().subscribe(data => this.distritos = data);

  }

}
