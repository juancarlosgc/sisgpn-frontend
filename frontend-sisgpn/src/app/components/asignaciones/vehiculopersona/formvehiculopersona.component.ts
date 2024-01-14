import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona';
import { Vehiculo } from 'src/app/model/vehiculo';
import { Vehiculopersona } from 'src/app/model/vehiculopersona';
import { VehiculopersonaService } from 'src/app/services/vehiculopersona.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formvehiculopersona',
  templateUrl: './formvehiculopersona.component.html',
  styleUrls: ['./formvehiculopersona.component.css']
})
export class FormvehiculopersonaComponent implements OnInit {

  personas: Persona[] = [];
  vehiculos: Vehiculo[] = [];
  vehiculosPersonas: Vehiculopersona[] = [];

  public vehiculoPersona: Vehiculopersona = new Vehiculopersona();
  public vehiculo: Vehiculo = new Vehiculo();
  public persona: Persona = new Persona();

  constructor(private vehiculoPersonaService: VehiculopersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.cargarVehiculoPersona();
    this.cargarPersonas();
    this.cargarVehiculos();
  }

  createVehiculoPersona(): void {
    this.vehiculoPersonaService.createVehiculoPersona(this.vehiculoPersona)
      .subscribe(data => {
        this.router.navigate(['/listadodistritovehiculo'])
        swal('Nuevo Asignación', ` creada con éxito!`, 'success')
      }
      )
  }

  cargarVehiculoPersona(): void {
    this.activatedRoute.params.subscribe(params => {
      let idVehiculoPersona = params['idVehiculoPersona']
      if (idVehiculoPersona) {
        this.vehiculoPersonaService.getVehiculoPersona(idVehiculoPersona).subscribe((idVehiculoPersona) => this.vehiculoPersona =idVehiculoPersona)
      }
    }
    )
  }

  updateVehiculoPersona(): void {
    this.vehiculoPersonaService.updateVehiculoPersona(this.vehiculoPersona)
      .subscribe(circuito => {
        this.router.navigate(['/listadovehiculopersona'])
        swal('Asignación Actualizada', ` actualizado con éxito!`, 'success')
      }
      )
  }

  cargarVehiculos(): void {
    this.vehiculoPersonaService.listVehiculos().subscribe(data => this.vehiculos = data);
  }

  cargarPersonas(): void {
    this.vehiculoPersonaService.listPersonas().subscribe(data => this.personas = data);
  }

}
