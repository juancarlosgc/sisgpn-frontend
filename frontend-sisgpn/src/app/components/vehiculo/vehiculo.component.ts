import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Vehiculo } from 'src/app/model/vehiculo';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  vehiculos: Vehiculo[]=[];
  paginador: any;  

  constructor(private vehiculoService: VehiculoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      console.log(page);
      if (!page) {
        page = 0;
      }
   
     this.vehiculoService.getVehiculos(page)
     .pipe(
        tap(response => {
          (response.content as Vehiculo[]).forEach(vehiculo => console.log(vehiculo.marca));
        })
        ).subscribe(response => {
         this.vehiculos = response.content as Vehiculo[];
         this.paginador = response;
       
       }); 
       }
        );
  }

  deleteVehiculo(vehiculo: Vehiculo): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar a ${vehiculo.marca} ${vehiculo.placa}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.vehiculoService.deleteVehiculo(vehiculo.idVehiculo).subscribe(
          response => {
            this.vehiculos = this.vehiculos.filter(vehiculo => vehiculo !== vehiculo)
            swal(
              'Vehículo Eliminado!',
              `Vehículo con placa ${vehiculo.placa} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

}
