import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Mantenimiento } from 'src/app/model/mantenimiento';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UtilService } from 'src/app/services/util.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {

  isAdmin: any;
  mantenimientos: Mantenimiento[]=[];
  paginador: any; 

  constructor(private mantenimientoService: MantenimientoService, private activatedRoute: ActivatedRoute, private util: UtilService) { }

  ngOnInit(): void {
    this.isAdmin = this.util.isAdmin();

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      console.log(page);
      if (!page) {
        page = 0;
      }
   
     this.mantenimientoService.getMantenimientos(page)
     .pipe(
        tap(response => {
          (response.content as Mantenimiento[]).forEach(data => console.log(data.nombreMantenimiento));
        })
        ).subscribe(response => {
         this.mantenimientos = response.content as Mantenimiento[];
         this.paginador = response;
       
       }); 
       }
        );
  }

  deleteMantenimiento(mantenimiento: Mantenimiento): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar a ${mantenimiento.codigoMantenimiento} ${mantenimiento.nombreMantenimiento}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.mantenimientoService.deleteMantenimiento(mantenimiento.idMantenimiento).subscribe(
          response => {
            this.mantenimientos = this.mantenimientos.filter(man => man !== mantenimiento)
            swal(
              'Mantenimiento Eliminado!',
              `Mantenimiento ${mantenimiento.codigoMantenimiento} ${mantenimiento.nombreMantenimiento} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

}
