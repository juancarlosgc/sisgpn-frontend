import { Component, OnInit } from '@angular/core';
import { Observable, filter, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/services/persona.service';
import swal from 'sweetalert2';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  isAdmin: any;
  personas: Persona[]=[];
  paginador: any;  

  constructor(private personaservicio: PersonaService, private activatedRoute: ActivatedRoute, private util: UtilService) { }

  ngOnInit() {

   this.isAdmin = this.util.isAdmin();
 
  this.activatedRoute.paramMap.subscribe(params => {
   let page: number = +params.get('page');
   console.log(page);
   if (!page) {
     page = 0;
   }

  this.personaservicio.getPersonas(page)
  .pipe(
     tap(response => {
       (response.content as Persona[]).forEach(persona => console.log(persona.nombres));
     })
     ).subscribe(response => {
      this.personas = response.content as Persona[];
      this.paginador = response;
    
    }); 
    }
     );
 }


 deletePersona(persona: Persona): void {
   swal({
     title: 'Está seguro?',
     text: `¿Seguro que desea eliminar a ${persona.apellidos} ${persona.nombres}?`,
     type: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Si, Eliminar!',
     cancelButtonText: 'No, Cancelar!'
   }).then((result) => {
     if (result.value) {
       this.personaservicio.deletePersona(persona.idPersona).subscribe(
         response => {
           this.personas = this.personas.filter(per => per !== persona)
           swal(
             'Persona Eliminada!',
             `Persona ${persona.apellidos} eliminada con éxito.`,
             'success'
           )
         }
       )
     }
   })
 }
 

 
}
