import { Component, OnInit } from '@angular/core';
import { Circuito } from 'src/app/model/circuito';
import { CircuitoComponent } from './circuito.component';
import { CircuitoService } from 'src/app/services/circuito.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Distrito } from 'src/app/model/distrito';

@Component({
  selector: 'app-formcircuito',
  templateUrl: './formcircuito.component.html',
  styleUrls: ['./formcircuito.component.css']
})
export class FormcircuitoComponent implements OnInit{

  distrito: Distrito[] = [];

  public circuito: Circuito = new Circuito();
  public distritos: Distrito = new Distrito();

  constructor(private circuitoService: CircuitoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    
  ngOnInit(): void {
    this.cargarCircuito();
    this.cargarDistritos();
  }

  
  createCircuito(): void {
    this.circuitoService.createCircuito(this.circuito)
      .subscribe(circuito => {
        this.router.navigate(['/listadocircuitos'])
        swal('Nuevo Circuito', `Circuito  ${circuito.nombreCircuito} creado con éxito!`, 'success')
      }
      )
  }

  cargarCircuito(): void {
    this.activatedRoute.params.subscribe(params => {
      let idCircuito = params['idCircuito']
      if (idCircuito) {
        this.circuitoService.getCircuito(idCircuito).subscribe((circuito) => this.circuito = circuito)
      }
    }
    )
  }

  updateCircuito(): void {
    this.circuitoService.updateCircuito(this.circuito)
      .subscribe(circuito => {
        this.router.navigate(['/listadocircuitos'])
        swal('Circuito Actualizado', `Circuito ${this.circuito.nombreCircuito} actualizado con éxito!`, 'success')
      }
      )
  }

  cargarDistritos(): void {
    this.circuitoService.listDistritos().subscribe(distritos => this.distrito = distritos);
    console.log(this.distrito);
  }

}
