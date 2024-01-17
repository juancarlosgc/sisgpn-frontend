import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Circuito } from 'src/app/model/circuito';
import { Reclamos } from 'src/app/model/reclamos';
import { Subcircuito } from 'src/app/model/subcircuito';
import { ReclamoService } from 'src/app/services/reclamo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formreclamos',
  templateUrl: './formreclamos.component.html',
  styleUrls: ['./formreclamos.component.css']
})
export class FormreclamosComponent implements OnInit{

  circuitos: Circuito[] = [];
  subcircuitos: Subcircuito[] = [];
  reclamos: Reclamos[] = [];

  public reclamo: Reclamos = new Reclamos();
  public circuito: Circuito = new Circuito();
  public subcircuito: Subcircuito = new Subcircuito();

  listaPrincipal: any[] = [];
  listaSecundaria: any[] = [];

  itemSeleccionado: number | undefined;
  itemSecundario: number | undefined;

  constructor(private reclamoService: ReclamoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerListaPrincipal();
   this.cargarCircuitos();
  this.cargarSubcircuitos();
  }

  createReclamo(): void {
    this.reclamoService.createReclamo(this.reclamo)
      .subscribe(data => {
        this.router.navigate(['/listadoreclamo'])
        swal('Nuevo Asignación', ` creada con éxito!`, 'success')
      }
      )
  }

  obtenerListaPrincipal() {
    this.reclamoService.obtenerListaPrincipal().subscribe(data => {
      this.circuitos = data;
      console.log(this.circuitos);
    });
  }

  actualizarListaSecundaria() {
    if (this.itemSeleccionado) {
      this.reclamoService.obtenerListaSecundaria(this.itemSeleccionado).subscribe(data => {
        this.listaSecundaria = data;
      });
    } else {
      this.subcircuitos = [];
    }
  }

  cargarCircuitos(): void {
    this.reclamoService.listCircuitos().subscribe(data => this.circuitos = data);
  }

  cargarSubcircuitos(): void {
    this.reclamoService.listSubcircuitos().subscribe(data => this.subcircuitos = data);
  }

  opcionSeleccionada: string; 
  opciones = [
    'RECLAMO', 
    'SUGERENCIA',
  
  ];


}
