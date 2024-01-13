import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mantenimiento } from 'src/app/model/mantenimiento';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formmantenimiento',
  templateUrl: './formmantenimiento.component.html',
  styleUrls: ['./formmantenimiento.component.css']
})
export class FormmantenimientoComponent implements OnInit{

  public mantenimiento: Mantenimiento = new Mantenimiento();


  constructor(private mantenimientoService: MantenimientoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.cargarMantenimiento();
  }

  createMantenimiento(): void{
    this.mantenimientoService.createMantenimiento(this.mantenimiento)
    .subscribe(mantenimiento => { 
    this.router.navigate(['/listadomantenimiento'])
    swal('Nuevo Mantenimiento vahicular', `Mantenimiento ${mantenimiento.codigoMantenimiento} ${mantenimiento.nombreMantenimiento} creado con éxito!`, 'success')
     }
  )
}

cargarMantenimiento(): void{
  this.activatedRoute.params.subscribe(params => {
  let idMantenimiento = params['idMantenimiento']
  if (idMantenimiento){
    this.mantenimientoService.getMantenimiento(idMantenimiento).subscribe( (data) => this.mantenimiento = data)
  }
  }
)
}

updateMantenimiento(): void{
  this.mantenimientoService.updateMantenimiento(this.mantenimiento)
  .subscribe (data => {
    this.router.navigate(['/listadomantenimiento'])
    swal('Mantenimiento Vehicular Actualizado', `Mantenimiento ${data.codigoMantenimiento} ${data.nombreMantenimiento} actualizado con éxito!`, 'success')
     }
  )
}


}
