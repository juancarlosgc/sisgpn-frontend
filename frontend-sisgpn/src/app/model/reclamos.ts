import { Circuito } from "./circuito";
import { Subcircuito } from "./subcircuito";

export class Reclamos {
    idReclamo: number;
    tipoIncidente: string;
    detalle: string;
    contacto: string;
    apellidos: string;
    nombres: string;
    idSubcircuito: number;
    nombreSubcircuito: string;
    idCircuito: number;
    nombreCircuito: string;
    circuitos: Circuito[] = [];
    subcircuitos: Subcircuito[] = [];

  
}


