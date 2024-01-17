import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Reclamos } from 'src/app/model/reclamos';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.css']
})
export class ReclamosComponent implements OnInit{

  isAdmin: any;
  reclamos: Reclamos[]=[];
  paginadorReclamos: any;  

  fechaInicio: string = '';
  fechaFin: string = '';
  registros: any[] = [];

  total: number = 0;
  contadorIncidentes: number = 0;
  contadorReclamos: number = 0;

  totalSugerencias: number = 0;
  totalReclamos: number = 0;

  subcircuitoCont: Reclamos[]= [];
  arregloResultante: any= [];

  constructor(private reclamoService: ReclamoService, 
    private activatedRoute: ActivatedRoute, 
    private util: UtilService) { }

    
  ngOnInit(): void {
    //this.buscarRegistros();
}

buscarRegistros() {
  const fechaInicio = new Date(this.fechaInicio);
  const fechaFin = new Date(this.fechaFin);

  this.reclamoService.buscarPorRangoFechas(fechaInicio, fechaFin).subscribe(data => {
    this.reclamos=data;
    console.log(data);

     let contadorSugerencias: number = 1;
     let contadorReclamos: number = 1;
     let mayor=0;
     let totalIncidentes=0;
     let aux=0;
   
     data.forEach( (value) => {
      
    let valor: number = Math.max(value.subcircuitos.idSubcircuito);

      if (valor>mayor){
        mayor=valor;
      }

      if(value.tipoIncidente == "SUGERENCIA" ){   
        contadorSugerencias = contadorSugerencias + 1;
        
      }else if (value.tipoIncidente == "RECLAMO"){
        contadorReclamos = contadorReclamos + 1;
      }
      totalIncidentes = contadorSugerencias + contadorReclamos;    


    


    });
   
      console.log("Cantidad sugerencias", aux );
      console.log("Sugerencias " + contadorSugerencias);
      console.log("Reclamos " + contadorReclamos);
      console.log("Numero mayor " + mayor);

  });
}
}
