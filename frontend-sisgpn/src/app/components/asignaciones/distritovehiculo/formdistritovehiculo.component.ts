import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Distritovehiculo } from 'src/app/model/distritovehiculo';
import { Subcircuito } from 'src/app/model/subcircuito';
import { Vehiculo } from 'src/app/model/vehiculo';
import { DistritovehiculoService } from 'src/app/services/distritovehiculo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formdistritovehiculo',
  templateUrl: './formdistritovehiculo.component.html',
  styleUrls: ['./formdistritovehiculo.component.css']
})
export class FormdistritovehiculoComponent implements OnInit{

  subcircuitos: Subcircuito[] = [];
  vehiculos: Vehiculo[] = [];
  distritosvehiculos: Distritovehiculo[] = [];

  public distritoVehiculo: Distritovehiculo = new Distritovehiculo();
  public vehiculo: Vehiculo = new Vehiculo();
  public subcircuito: Subcircuito = new Subcircuito();

  constructor(private distritoVehiculoService: DistritovehiculoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarDistritoVehiculo();
    this.cargarSubcircuitos();
    this.cargarVehiculos();
  }
  
  createDistritoVehiculo(): void {
    this.distritoVehiculoService.createDistritoVehiculo(this.distritoVehiculo)
      .subscribe(data => {
        this.router.navigate(['/listadodistritovehiculo'])
        swal('Nuevo Asignación', ` creada con éxito!`, 'success')
      }
      )
  }

  cargarDistritoVehiculo(): void {
    this.activatedRoute.params.subscribe(params => {
      let idDistritoVehiculo = params['idDistritoVehiculo']
      if (idDistritoVehiculo) {
        this.distritoVehiculoService.getDistritoVehiculo(idDistritoVehiculo).subscribe((idDistritoVehiculo) => this.distritoVehiculo =idDistritoVehiculo)
      }
    }
    )
  }

  updateDistritoVehiculo(): void {
    this.distritoVehiculoService.updateDistritoVehiculo(this.distritoVehiculo)
      .subscribe(circuito => {
        this.router.navigate(['/listadodistritovehiculo'])
        swal('Asignación Actualizada', ` actualizado con éxito!`, 'success')
      }
      )
  }

  cargarVehiculos(): void {
    this.distritoVehiculoService.listVehiculos().subscribe(data => this.vehiculos = data);
  }

  cargarSubcircuitos(): void {
    this.distritoVehiculoService.listSubcircuitos().subscribe(data => this.subcircuitos = data);
  }
}
