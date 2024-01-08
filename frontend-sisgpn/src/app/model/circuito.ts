import { Distrito } from "./distrito";
import { Subcircuito } from "./subcircuito";

export class Circuito {
    idCircuito: number;
    codigoCircuito: string;
    nombreCircuito: string;
    subcircuitos: Subcircuito[] = [];
    distrito: Distrito;
    idDistrito: number;

}
