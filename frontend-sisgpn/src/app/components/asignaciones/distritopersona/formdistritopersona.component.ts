import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Distritopersona } from 'src/app/model/distritopersona';
import { Persona } from 'src/app/model/persona';
import { Subcircuito } from 'src/app/model/subcircuito';
import { DistritopersonaService } from 'src/app/services/distritopersona.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formdistritopersona',
  templateUrl: './formdistritopersona.component.html',
  styleUrls: ['./formdistritopersona.component.css']
})
export class FormdistritopersonaComponent implements OnInit{

  subcircuitos: Subcircuito[] = [];
  personas: Persona[] = [];
  distritospersonas: Distritopersona[] = [];

  public distritopersona: Distritopersona = new Distritopersona();
  public persona: Persona = new Persona();
  public subcircuito: Subcircuito = new Subcircuito();



  constructor(private distritoPersonaService: DistritopersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    today = new Date();

  ngOnInit(): void {
    this.cargarDistritoPersona();
    this.cargarPersonas();
    this.cargarSubcircuitos();
  }

  createDistritoPersona(): void {
    this.distritoPersonaService.createDistritoPersona(this.distritopersona)
      .subscribe(data => {
        this.router.navigate(['/listadodistritopersona'])
        swal('Nuevo Asignación', `creada con éxito!`, 'success')
      }
      )
  }

  cargarDistritoPersona(): void {
    this.activatedRoute.params.subscribe(params => {
      let idDistritoPersona = params['idDistritoPersona']
      if (idDistritoPersona) {
        this.distritoPersonaService.getDistritoPersona(idDistritoPersona).subscribe((idDistritoPersona) => this.distritopersona =idDistritoPersona)
      }
    }
    )
  }

  updateDistritoPersona(): void {
    this.distritoPersonaService.updateDistritoPersona(this.distritopersona)
      .subscribe(circuito => {
        this.router.navigate(['/listadodistritopersona'])
        swal('Asignación ', `actualizado con éxito!`, 'success')
      }
      )
  }


  cargarPersonas(): void {
    this.distritoPersonaService.listPersonas().subscribe(data => this.personas = data);
  }

  cargarSubcircuitos(): void {
    this.distritoPersonaService.listSubcircuitos().subscribe(data => this.subcircuitos = data);
  }

 
}
