import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Distrito } from 'src/app/model/distrito';
import { DistritoService } from 'src/app/services/distrito.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formdistrito',
  templateUrl: './formdistrito.component.html',
  styleUrls: ['./formdistrito.component.css']
})
export class FormdistritoComponent implements OnInit {

 // private URL: string = 'http://localhost:8080/distritos';
  public distrito: Distrito = new Distrito();

  constructor(private distritoService: DistritoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarDistrito();
  }


  createDistrito(): void {
    this.distritoService.createDistrito(this.distrito)
      .subscribe(distrito => {
        this.router.navigate(['/listadodistritos'])
        swal('Nuevo Distrito', `Distrito  ${distrito.nombreDistrito} creado con éxito!`, 'success')

      }
      )
  }

  cargarDistrito(): void {
    this.activatedRoute.params.subscribe(params => {
      let idDistrito = params['idDistrito']
      if (idDistrito) {
        this.distritoService.getDistrito(idDistrito).subscribe((distrito) => this.distrito = distrito)
      }
    }
    )
  }

  updateDistrito(): void {
    this.distritoService.updateDistrito(this.distrito)
      .subscribe(distrito => {
        this.router.navigate(['/listadodistritos'])
        swal('Distrito Actualizado', `Distrito ${this.distrito.nombreDistrito} actualizado con éxito!`, 'success')
      }
      )
  }

}
