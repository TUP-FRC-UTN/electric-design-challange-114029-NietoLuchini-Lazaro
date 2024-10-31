import { Signal } from "@angular/core";

export interface Budget {
  id?: string;
  client: string;
  date: Date;
  modules:modules[];
}

export interface modules{
  name: string;
  slots: number;
  price: number;
  zona:string;
}



export enum Zone {
  LIVING = 'Living',
  COMEDOR = 'Comedor',
  KITCHEN = 'Cocina',
  ROOM = 'Dormitorio'
}

export interface ModuleType {
  id: number;
  name: string;
  slots: number;
  price: number;
}


