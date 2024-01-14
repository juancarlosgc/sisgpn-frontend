import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Persona } from 'src/app/model/persona';
import { Vehiculo } from 'src/app/model/vehiculo';
import { Vehiculopersona } from 'src/app/model/vehiculopersona';
import { UtilService } from 'src/app/services/util.service';
import { VehiculopersonaService } from 'src/app/services/vehiculopersona.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculopersona',
  templateUrl: './vehiculopersona.component.html',
  styleUrls: ['./vehiculopersona.component.css']
})
export class VehiculopersonaComponent implements OnInit{

  isAdmin: any;
 
  vehiculospersonas: Vehiculopersona[] = [];
  paginadorVehiculoPersona: any;

  constructor(private vehiculoPersonaService: VehiculopersonaService, 
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

      this.vehiculoPersonaService.getVehiculosPersonas(page)
        .pipe(
          tap(response => {
            (response.content as Vehiculopersona[]).forEach(data => console.log(data.idVehiculoPersona));
          })
        ).subscribe(response => {
          this.vehiculospersonas = response.content as Vehiculopersona[];
          this.paginadorVehiculoPersona = response;
          
        });
    }
    );
  }

  
  deleteVehiculoPersona(vehiculoPersona: Vehiculopersona): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la asignación?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.vehiculoPersonaService.deleteVehiculoPersona(vehiculoPersona.idVehiculoPersona).subscribe(
          response => {
            this.vehiculospersonas = this.vehiculospersonas.filter(dis => dis !== vehiculoPersona)
            swal(
              'Asignacion Eliminada!',
              `Asignación eliminada con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

}
