import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { Router, ActivatedRoute } from '@angular/router';
import   swal  from 'sweetalert2';

@Component({
  selector: 'app-formregistrarpersona',
  templateUrl: './formregistrarpersona.component.html',
  styleUrls: ['./formregistrarpersona.component.css']
})
export class FormregistrarpersonaComponent implements OnInit{
  private URL: string = 'http://localhost:8080/personas';
  public persona: Persona = new Persona();
  private titulo: string = "Formulario de Registro de Persona"
  
  
  constructor(private personaService: PersonaService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarPersona();
  }
  
   createPersona(): void{
      this.personaService.createPersona(this.persona)
      .subscribe(persona => { 
      this.router.navigate(['/listadopersonas'])
      swal('Nueva Persona', `Persona ${persona.apellidos} ${persona.nombres} creada con éxito!`, 'success')
      
    }
    )
  }

  cargarPersona(): void{
      this.activatedRoute.params.subscribe(params => {
      let idPersona = params['idPersona']
      if (idPersona){
        this.personaService.getPersona(idPersona).subscribe( (persona) => this.persona = persona)
      }
      }
    )}

  updatePersona(): void{
    this.personaService.updatePersona(this.persona)
    .subscribe (persona => {
      this.router.navigate(['/listadopersonas'])
      swal('Persona Actualizada', `Persona ${persona.apellidos} ${persona.nombres} actualizada con éxito!`, 'success')
       }
    )
  }

  opcionSeleccionada: string; 
  opciones = [
    'CAPITAN', 
    'TENIENTE',
    'SUBTENIENTE', 
    'SARGENTO_PRIMERO', 
    'SARGENTO_SEGUNDO', 
    'CABO_PRIMERO',
    'CABO_SEGUNDO',
  ];

  
}
 


