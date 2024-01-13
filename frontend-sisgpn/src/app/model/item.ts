import { Mantenimiento } from "./mantenimiento";

export class Item {
    idItem: number;
    codigoItem: string;
    nombreItem: string;
    descripcionItem: string;
    mantenimiento: Mantenimiento;
    idMantenimiento: number;
    nombreMantenimiento: string;
}
