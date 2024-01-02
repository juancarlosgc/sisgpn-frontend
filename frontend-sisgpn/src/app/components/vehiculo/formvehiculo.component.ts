import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehiculo } from 'src/app/model/vehiculo';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formvehiculo',
  templateUrl: './formvehiculo.component.html',
  styleUrls: ['./formvehiculo.component.css']
})
export class FormvehiculoComponent implements OnInit {
  private URL: string = 'http://localhost:8080/personas';
  public vehiculo: Vehiculo = new Vehiculo();


  constructor(private vehiculoService: VehiculoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }



  ngOnInit(): void {
    this.cargarVehiculo();
  }

  createVehiculo(): void {
    this.vehiculoService.createVehiculo(this.vehiculo)
      .subscribe(vehiculo => {
        this.router.navigate(['/listadovehiculos'])
        swal('Nuevo Vehículo', `Vehiculo ${vehiculo.placa} ${vehiculo.marca} creado con éxito!`, 'success')

      }
      )
  }

  cargarVehiculo(): void {
    this.activatedRoute.params.subscribe(params => {
      let idVehiculo = params['idVehiculo']
      if (idVehiculo) {
        this.vehiculoService.getVehiculo(idVehiculo).subscribe((vehiculo) => this.vehiculo = vehiculo)
      }
    }
    )
  }

  updateVehiculo(): void {
    this.vehiculoService.updateVehiculo(this.vehiculo)
      .subscribe(vehiculo => {
        this.router.navigate(['/listadovehiculos'])
        swal('Vehículo Actualizada', `Vehículo ${this.vehiculo.marca} ${this.vehiculo.placa} actualizado con éxito!`, 'success')
      }
      )
  }

  opcionSeleccionada: string;
  opciones = [
    'AUTOMOVIL',
    'MOTOCICLETA',
    'CAMIONETA'
  ];

}
