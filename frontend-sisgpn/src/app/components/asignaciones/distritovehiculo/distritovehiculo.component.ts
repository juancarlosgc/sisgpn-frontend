import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Distritovehiculo } from 'src/app/model/distritovehiculo';
import { DistritovehiculoService } from 'src/app/services/distritovehiculo.service';
import { UtilService } from 'src/app/services/util.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-distritovehiculo',
  templateUrl: './distritovehiculo.component.html',
  styleUrls: ['./distritovehiculo.component.css']
})
export class DistritovehiculoComponent implements OnInit {

  isAdmin: any;
 
  distritosvehiculos: Distritovehiculo[] = [];
  paginadorDistritoVehiculo: any;

  constructor(private distritoVehiculoService: DistritovehiculoService, 
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

      this.distritoVehiculoService.getDistritosVehiculos(page)
        .pipe(
          tap(response => {
            (response.content as Distritovehiculo[]).forEach(data => console.log(data.idDistritoVehiculo));
          })
        ).subscribe(response => {
          this.distritosvehiculos = response.content as Distritovehiculo[];
          this.paginadorDistritoVehiculo = response;
          
        });
    }
    );
  }

  deleteDistritoVehiculo(distritovehiculo: Distritovehiculo): void {
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
        this.distritoVehiculoService.deleteDistritoVehiculo(distritovehiculo.idDistritoVehiculo).subscribe(
          response => {
            this.distritosvehiculos = this.distritosvehiculos.filter(dis => dis !== distritovehiculo)
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
