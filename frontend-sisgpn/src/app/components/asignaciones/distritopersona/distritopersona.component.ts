import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Distritopersona } from 'src/app/model/distritopersona';
import { Persona } from 'src/app/model/persona';
import { Subcircuito } from 'src/app/model/subcircuito';
import { DistritopersonaService } from 'src/app/services/distritopersona.service';
import { UtilService } from 'src/app/services/util.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-distritopersona',
  templateUrl: './distritopersona.component.html',
  styleUrls: ['./distritopersona.component.css']
})
export class DistritopersonaComponent implements OnInit{

  isAdmin: any;
 
  distritospersonas: Distritopersona[] = [];
  paginadorDistritoPersona: any;

  constructor(private distritoPersonaService: DistritopersonaService, 
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

      this.distritoPersonaService.getDistritosPersonas(page)
        .pipe(
          tap(response => {
            (response.content as Distritopersona[]).forEach(data => console.log(data.idDistritoPersona));
          })
        ).subscribe(response => {
          this.distritospersonas = response.content as Distritopersona[];
          this.paginadorDistritoPersona = response;
          
        });
    }
    );
 
  }

  deleteDistritoPersona(distritopersona: Distritopersona): void {
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
        this.distritoPersonaService.deleteDistritoPersona(distritopersona.idDistritoPersona).subscribe(
          response => {
            this.distritospersonas = this.distritospersonas.filter(dis => dis !== distritopersona)
            swal(
              'Asignación Eliminada!',
              `Asignación eliminada con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

  

}
