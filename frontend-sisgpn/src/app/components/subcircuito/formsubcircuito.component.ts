import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Circuito } from 'src/app/model/circuito';
import { Subcircuito } from 'src/app/model/subcircuito';
import { SubcircuitoService } from 'src/app/services/subcircuito.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formsubcircuito',
  templateUrl: './formsubcircuito.component.html',
  styleUrls: ['./formsubcircuito.component.css']
})
export class FormsubcircuitoComponent implements OnInit{

  circuito: Circuito[] = [];

  public subcircuito: Subcircuito = new Subcircuito();
  public circuitos: Circuito = new Circuito();

  constructor(private subcircuitoService: SubcircuitoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarSubcircuito();
    this.cargarCircuitos();
  }

  createSubcircuito(): void {
    this.subcircuitoService.createSubcircuito(this.subcircuito)
      .subscribe(subcircuito => {
        this.router.navigate(['/listadosubcircuitos'])
        swal('Nuevo Subcircuito', `Subcircuito  ${subcircuito.nombreSubcircuito} creado con éxito!`, 'success')
      }
      )
  }

  cargarSubcircuito(): void {
    this.activatedRoute.params.subscribe(params => {
      let idSubcircuito = params['idSubcircuito']
      if (idSubcircuito) {
        this.subcircuitoService.getSubcircuito(idSubcircuito).subscribe((subcircuito) => this.subcircuito = subcircuito)
      }
    }
    )
  }

  updateSubcircuito(): void {
    this.subcircuitoService.updateSubcircuito(this.subcircuito)
      .subscribe(subcircuito => {
        this.router.navigate(['/listadosubcircuitos'])
        swal('Subircuito Actualizado', `Subircuito ${this.subcircuito.nombreSubcircuito} actualizado con éxito!`, 'success')
      }
      )
  }

  cargarCircuitos(): void {
    this.subcircuitoService.listCircuitos().subscribe(circuitos => this.circuito = circuitos);
  }

}
