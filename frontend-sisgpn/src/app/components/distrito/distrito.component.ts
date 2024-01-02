import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Distrito } from 'src/app/model/distrito';
import { DistritoService } from 'src/app/services/distrito.service';
import { UtilService } from 'src/app/services/util.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-distrito',
  templateUrl: './distrito.component.html',
  styleUrls: ['./distrito.component.css']
})
export class DistritoComponent implements OnInit {

  isAdmin: any;
  distritos: Distrito[] = [];
  paginador: any;

  constructor(private distritoServicio: DistritoService, private activatedRoute: ActivatedRoute, private util: UtilService) { }

  ngOnInit(): void {
    this.isAdmin = this.util.isAdmin();

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      console.log(page);
      if (!page) {
        page = 0;
      }

      this.distritoServicio.getDistritos(page)
        .pipe(
          tap(response => {
            (response.content as Distrito[]).forEach(distrito => console.log(distrito.nombreDistrito));
          })
        ).subscribe(response => {
          this.distritos = response.content as Distrito[];
          this.paginador = response;

        });
    }
    );
  }


  deleteDistrito(distrito: Distrito): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar a ${distrito.codigoDistrito} ${distrito.nombreDistrito}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.distritoServicio.deleteDistrito(distrito.idDistrito).subscribe(
          response => {
            this.distritos = this.distritos.filter(dis => dis !== distrito)
            swal(
              'Persona Eliminada!',
              `Persona ${distrito.nombreDistrito} eliminada con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

}
